"use client";

import { useEffect, useRef, useCallback } from "react";
import Image from "next/image";

interface GlitchGLEffectProps {
  targetSelector: string;
}

export default function GlitchGLEffect({ targetSelector }: GlitchGLEffectProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const glRef = useRef<WebGLRenderingContext | null>(null);
  const programRef = useRef<WebGLProgram | null>(null);
  const textureRef = useRef<WebGLTexture | null>(null);
  const animationRef = useRef<number>(0);
  const mouseRef = useRef({ x: 0.5, y: 0.5 });
  const velocityRef = useRef(0);
  const prevMouseRef = useRef({ x: 0, y: 0 });
  const timeRef = useRef(0);
  const logoLoadedRef = useRef(false);
  const logoTextureRef = useRef<WebGLTexture | null>(null);

  // Vertex shader
  const vertexShaderSource = `
    attribute vec2 a_position;
    attribute vec2 a_texCoord;
    varying vec2 v_texCoord;
    void main() {
      gl_Position = vec4(a_position, 0.0, 1.0);
      v_texCoord = a_texCoord;
    }
  `;

  // Fragment shader with glitch effects
  const fragmentShaderSource = `
    precision mediump float;
    
    varying vec2 v_texCoord;
    uniform sampler2D u_image;
    uniform sampler2D u_logo;
    uniform vec2 u_mouse;
    uniform float u_velocity;
    uniform float u_time;
    uniform vec2 u_resolution;
    uniform float u_logoLoaded;
    
    // Noise function
    float random(vec2 st) {
      return fract(sin(dot(st.xy, vec2(12.9898, 78.233))) * 43758.5453123);
    }
    
    // Perlin-like noise
    float noise(vec2 st) {
      vec2 i = floor(st);
      vec2 f = fract(st);
      float a = random(i);
      float b = random(i + vec2(1.0, 0.0));
      float c = random(i + vec2(0.0, 1.0));
      float d = random(i + vec2(1.0, 1.0));
      vec2 u = f * f * (3.0 - 2.0 * f);
      return mix(a, b, u.x) + (c - a) * u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
    }
    
    void main() {
      vec2 uv = v_texCoord;
      
      // Calculate distance from mouse (flip Y for WebGL coordinates)
      vec2 mousePos = vec2(u_mouse.x, 1.0 - u_mouse.y);
      float dist = distance(uv, mousePos);
      
      // Interaction radius based on velocity
      float baseRadius = 0.15;
      float radius = baseRadius + u_velocity * 0.1;
      float influence = smoothstep(radius, 0.0, dist);
      
      // Apply glitch effects based on velocity and proximity to cursor
      float glitchStrength = u_velocity * influence;
      
      // RGB shift effect
      float rgbShift = glitchStrength * 0.03;
      vec2 rOffset = vec2(rgbShift, 0.0);
      vec2 bOffset = vec2(-rgbShift, 0.0);
      
      // Line displacement (horizontal scanline glitch)
      float lineNoise = step(0.98, random(vec2(floor(uv.y * 100.0), u_time))) * glitchStrength;
      float displacement = lineNoise * 0.05 * (random(vec2(u_time)) - 0.5);
      
      // Digital block noise
      float blockSize = 0.02 + glitchStrength * 0.03;
      vec2 blockUV = floor(uv / blockSize) * blockSize;
      float blockNoise = step(0.97 - glitchStrength * 0.1, random(blockUV + u_time));
      
      // Apply displacement
      vec2 distortedUV = uv;
      distortedUV.x += displacement;
      distortedUV.x += blockNoise * (random(blockUV) - 0.5) * 0.1 * glitchStrength;
      
      // Pixelation effect near cursor
      float pixelSize = 1.0 + glitchStrength * 15.0;
      vec2 pixelatedUV = distortedUV;
      if (glitchStrength > 0.01) {
        vec2 pixelGrid = u_resolution / pixelSize;
        pixelatedUV = floor(distortedUV * pixelGrid) / pixelGrid;
      }
      
      // Sample texture with RGB split
      float r = texture2D(u_image, pixelatedUV + rOffset).r;
      float g = texture2D(u_image, pixelatedUV).g;
      float b = texture2D(u_image, pixelatedUV + bOffset).b;
      float a = texture2D(u_image, pixelatedUV).a;
      
      vec4 color = vec4(r, g, b, a);
      
      // Add digital noise overlay
      float noiseAmount = glitchStrength * 0.15;
      float n = random(uv + u_time * 0.1);
      color.rgb = mix(color.rgb, vec3(n), noiseAmount);
      
      // Scanline effect
      float scanline = sin(uv.y * u_resolution.y * 2.0) * 0.03 * (0.5 + glitchStrength);
      color.rgb -= scanline;
      
      // Frame ghosting / afterimage effect
      if (glitchStrength > 0.05) {
        vec2 ghostOffset = (mousePos - uv) * 0.02;
        vec4 ghost = texture2D(u_image, uv - ghostOffset);
        color.rgb = mix(color.rgb, ghost.rgb, glitchStrength * 0.3);
      }
      
      // Signal dropout (random colored blocks)
      if (blockNoise > 0.5 && glitchStrength > 0.2) {
        float dropoutType = random(blockUV * 2.0);
        if (dropoutType < 0.33) {
          color.rgb = vec3(0.0); // Black
        } else if (dropoutType < 0.66) {
          color.rgb = vec3(1.0); // White
        } else {
          color.rgb = vec3(1.0, 0.114, 0.616); // Hot pink (#FF1D9D)
        }
      }
      
      // Vignette
      float vignette = 1.0 - smoothstep(0.5, 1.5, length(uv - 0.5) * 1.5);
      color.rgb *= vignette;
      
      gl_FragColor = color;
    }
  `;

  const createShader = useCallback((gl: WebGLRenderingContext, type: number, source: string): WebGLShader | null => {
    const shader = gl.createShader(type);
    if (!shader) return null;
    
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
      console.error("Shader compile error:", gl.getShaderInfoLog(shader));
      gl.deleteShader(shader);
      return null;
    }
    
    return shader;
  }, []);

  const createProgram = useCallback((gl: WebGLRenderingContext, vertexShader: WebGLShader, fragmentShader: WebGLShader): WebGLProgram | null => {
    const program = gl.createProgram();
    if (!program) return null;
    
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);
    
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error("Program link error:", gl.getProgramInfoLog(program));
      gl.deleteProgram(program);
      return null;
    }
    
    return program;
  }, []);

  const loadTexture = useCallback((gl: WebGLRenderingContext, image: HTMLImageElement | HTMLCanvasElement): WebGLTexture | null => {
    const texture = gl.createTexture();
    if (!texture) return null;
    
    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    
    return texture;
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext("webgl", { 
      premultipliedAlpha: false,
      preserveDrawingBuffer: true 
    });
    if (!gl) {
      console.error("WebGL not supported");
      return;
    }
    glRef.current = gl;

    let destroyed = false;

    const init = async () => {
      // Find the target element and capture its appearance
      const targetElement = document.querySelector(targetSelector);
      if (!targetElement) {
        console.warn("Target element not found:", targetSelector);
        return;
      }

      // Get the background image from the target
      const imgElement = targetElement.querySelector("img");
      if (!imgElement) {
        console.warn("No image found in target element");
        return;
      }

      // Wait for image to load
      await new Promise<void>((resolve) => {
        if (imgElement.complete) {
          resolve();
        } else {
          imgElement.onload = () => resolve();
        }
      });

      if (destroyed) return;

      // Create shaders
      const vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexShaderSource);
      const fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource);
      
      if (!vertexShader || !fragmentShader) return;

      const program = createProgram(gl, vertexShader, fragmentShader);
      if (!program) return;
      
      programRef.current = program;
      gl.useProgram(program);

      // Set up geometry (fullscreen quad)
      const positions = new Float32Array([
        -1, -1,  1, -1,  -1, 1,
        -1, 1,   1, -1,   1, 1,
      ]);
      
      const texCoords = new Float32Array([
        0, 1,  1, 1,  0, 0,
        0, 0,  1, 1,  1, 0,
      ]);

      // Position buffer
      const positionBuffer = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
      gl.bufferData(gl.ARRAY_BUFFER, positions, gl.STATIC_DRAW);
      
      const positionLocation = gl.getAttribLocation(program, "a_position");
      gl.enableVertexAttribArray(positionLocation);
      gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);

      // TexCoord buffer
      const texCoordBuffer = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, texCoordBuffer);
      gl.bufferData(gl.ARRAY_BUFFER, texCoords, gl.STATIC_DRAW);
      
      const texCoordLocation = gl.getAttribLocation(program, "a_texCoord");
      gl.enableVertexAttribArray(texCoordLocation);
      gl.vertexAttribPointer(texCoordLocation, 2, gl.FLOAT, false, 0, 0);

      // Load the background image as texture
      // Create a canvas to draw the image (handles cross-origin issues)
      const tempCanvas = document.createElement("canvas");
      const rect = targetElement.getBoundingClientRect();
      tempCanvas.width = rect.width || window.innerWidth;
      tempCanvas.height = rect.height || window.innerHeight;
      const tempCtx = tempCanvas.getContext("2d");
      
      if (tempCtx) {
        // Draw the image maintaining aspect ratio (cover)
        const imgAspect = imgElement.naturalWidth / imgElement.naturalHeight;
        const canvasAspect = tempCanvas.width / tempCanvas.height;
        
        let drawWidth, drawHeight, drawX, drawY;
        
        if (imgAspect > canvasAspect) {
          drawHeight = tempCanvas.height;
          drawWidth = drawHeight * imgAspect;
          drawX = (tempCanvas.width - drawWidth) / 2;
          drawY = 0;
        } else {
          drawWidth = tempCanvas.width;
          drawHeight = drawWidth / imgAspect;
          drawX = 0;
          drawY = (tempCanvas.height - drawHeight) / 2;
        }
        
        // Apply duotone-like color transformation
        tempCtx.filter = "contrast(1.1) saturate(0.8)";
        tempCtx.drawImage(imgElement, drawX, drawY, drawWidth, drawHeight);
        
        // Apply color overlay for duotone effect
        tempCtx.globalCompositeOperation = "multiply";
        const gradient = tempCtx.createLinearGradient(0, 0, tempCanvas.width, tempCanvas.height);
        gradient.addColorStop(0, "#495b80");
        gradient.addColorStop(1, "#5a6c8f");
        tempCtx.fillStyle = gradient;
        tempCtx.fillRect(0, 0, tempCanvas.width, tempCanvas.height);
        
        tempCtx.globalCompositeOperation = "source-over";
      }

      const texture = loadTexture(gl, tempCanvas);
      if (texture) {
        textureRef.current = texture;
      }

      // Load Cleo+ logo for cursor shape
      const logoImg = new window.Image();
      logoImg.crossOrigin = "anonymous";
      logoImg.src = "/CleoLogo.png";
      logoImg.onload = () => {
        const logoTexture = loadTexture(gl, logoImg);
        if (logoTexture) {
          logoTextureRef.current = logoTexture;
          logoLoadedRef.current = true;
        }
      };

      // Resize canvas to match target
      const resizeCanvas = () => {
        const rect = targetElement.getBoundingClientRect();
        canvas.width = rect.width || window.innerWidth;
        canvas.height = rect.height || window.innerHeight;
        canvas.style.width = `${canvas.width}px`;
        canvas.style.height = `${canvas.height}px`;
        gl.viewport(0, 0, canvas.width, canvas.height);
      };
      
      resizeCanvas();
      window.addEventListener("resize", resizeCanvas);

      // Animation loop
      const render = () => {
        if (destroyed || !programRef.current) return;

        timeRef.current += 0.016; // ~60fps time increment
        
        gl.clearColor(0, 0, 0, 1);
        gl.clear(gl.COLOR_BUFFER_BIT);

        gl.useProgram(programRef.current);

        // Set uniforms
        const mouseLocation = gl.getUniformLocation(programRef.current, "u_mouse");
        const velocityLocation = gl.getUniformLocation(programRef.current, "u_velocity");
        const timeLocation = gl.getUniformLocation(programRef.current, "u_time");
        const resolutionLocation = gl.getUniformLocation(programRef.current, "u_resolution");
        const logoLoadedLocation = gl.getUniformLocation(programRef.current, "u_logoLoaded");

        gl.uniform2f(mouseLocation, mouseRef.current.x, mouseRef.current.y);
        gl.uniform1f(velocityLocation, velocityRef.current);
        gl.uniform1f(timeLocation, timeRef.current);
        gl.uniform2f(resolutionLocation, canvas.width, canvas.height);
        gl.uniform1f(logoLoadedLocation, logoLoadedRef.current ? 1.0 : 0.0);

        // Bind texture
        if (textureRef.current) {
          gl.activeTexture(gl.TEXTURE0);
          gl.bindTexture(gl.TEXTURE_2D, textureRef.current);
          const imageLocation = gl.getUniformLocation(programRef.current, "u_image");
          gl.uniform1i(imageLocation, 0);
        }

        // Draw
        gl.drawArrays(gl.TRIANGLES, 0, 6);

        // Decay velocity
        velocityRef.current *= 0.92;

        animationRef.current = requestAnimationFrame(render);
      };

      render();

      return () => {
        window.removeEventListener("resize", resizeCanvas);
      };
    };

    init();

    // Mouse move handler
    const handleMouseMove = (e: MouseEvent) => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const rect = canvas.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;

      // Calculate velocity
      const dx = e.clientX - prevMouseRef.current.x;
      const dy = e.clientY - prevMouseRef.current.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      
      velocityRef.current = Math.min(distance / 50, 1);
      
      prevMouseRef.current = { x: e.clientX, y: e.clientY };
      mouseRef.current = { x, y };
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      destroyed = true;
      window.removeEventListener("mousemove", handleMouseMove);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [targetSelector, createShader, createProgram, loadTexture, vertexShaderSource, fragmentShaderSource]);

  return (
    <>
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ zIndex: 1 }}
      />
      {/* Cleo+ logo cursor that follows mouse */}
      <CursorLogo />
    </>
  );
}

// Separate component for the cursor logo
function CursorLogo() {
  const logoRef = useRef<HTMLDivElement>(null);
  const velocityRef = useRef(0);
  const prevMouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!logoRef.current) return;

      // Calculate velocity
      const dx = e.clientX - prevMouseRef.current.x;
      const dy = e.clientY - prevMouseRef.current.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      
      velocityRef.current = Math.min(distance / 30, 1);
      prevMouseRef.current = { x: e.clientX, y: e.clientY };

      // Only show when moving fast enough
      const opacity = velocityRef.current > 0.1 ? Math.min(velocityRef.current * 1.5, 0.8) : 0;
      const scale = 0.8 + velocityRef.current * 0.4;

      logoRef.current.style.left = `${e.clientX}px`;
      logoRef.current.style.top = `${e.clientY}px`;
      logoRef.current.style.opacity = `${opacity}`;
      logoRef.current.style.transform = `translate(-50%, -50%) scale(${scale})`;
    };

    // Decay velocity
    const decayInterval = setInterval(() => {
      if (velocityRef.current > 0.01) {
        velocityRef.current *= 0.9;
        if (logoRef.current && velocityRef.current < 0.1) {
          logoRef.current.style.opacity = "0";
        }
      }
    }, 50);

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      clearInterval(decayInterval);
    };
  }, []);

  return (
    <div
      ref={logoRef}
      className="fixed pointer-events-none z-50 transition-opacity duration-150"
      style={{
        opacity: 0,
        width: "120px",
        height: "60px",
      }}
    >
      <Image
        src="/CleoLogo.png"
        alt=""
        width={120}
        height={60}
        className="w-full h-auto drop-shadow-[0_0_20px_rgba(255,255,255,0.6)]"
        style={{
          filter: "drop-shadow(0 0 10px rgba(255,29,157,0.5))",
        }}
      />
    </div>
  );
}
