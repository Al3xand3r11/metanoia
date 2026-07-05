import type { CSSProperties } from "react";
import { marqueeText } from "./constants";

interface DefinitionMarqueeProps {
  /** Number of copies rendered to create a seamless loop. */
  repeat: number;
  /** Animation class controlling the scroll speed/direction. */
  animationClassName: string;
  /** Classes for the outer container (e.g. spacing overrides). */
  containerClassName?: string;
  /** Inline styles for the outer container. */
  containerStyle?: CSSProperties;
  /** Classes applied to each text span. */
  textClassName: string;
  /** Inline styles applied to each text span. */
  textStyle?: CSSProperties;
}

export default function DefinitionMarquee({
  repeat,
  animationClassName,
  containerClassName = "",
  containerStyle,
  textClassName,
  textStyle,
}: DefinitionMarqueeProps) {
  return (
    <div
      className={`w-full overflow-hidden ${containerClassName}`}
      style={containerStyle}
    >
      <div className={`flex whitespace-nowrap ${animationClassName}`}>
        {Array.from({ length: repeat }).map((_, i) => (
          <span key={i} className={textClassName} style={textStyle}>
            {marqueeText}
          </span>
        ))}
      </div>
    </div>
  );
}
