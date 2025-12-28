/**
 * Sanitize user input to prevent XSS attacks
 * This removes HTML tags, script content, and dangerous patterns
 */

// HTML entities to decode (common ones that might be used in attacks)
const HTML_ENTITIES: Record<string, string> = {
  "&lt;": "<",
  "&gt;": ">",
  "&amp;": "&",
  "&quot;": '"',
  "&#x27;": "'",
  "&#x2F;": "/",
  "&#39;": "'",
  "&#47;": "/",
};

/**
 * Decode HTML entities so we can properly strip them
 */
function decodeHTMLEntities(text: string): string {
  let decoded = text;
  for (const [entity, char] of Object.entries(HTML_ENTITIES)) {
    decoded = decoded.replace(new RegExp(entity, "gi"), char);
  }
  return decoded;
}

/**
 * Remove all HTML tags from a string
 */
function stripHTMLTags(text: string): string {
  // Remove script tags and their content first
  let cleaned = text.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, "");
  
  // Remove style tags and their content
  cleaned = cleaned.replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, "");
  
  // Remove all other HTML tags
  cleaned = cleaned.replace(/<[^>]*>/g, "");
  
  return cleaned;
}

/**
 * Remove dangerous patterns that could be used for XSS
 */
function removeDangerousPatterns(text: string): string {
  let cleaned = text;
  
  // Remove javascript: protocol
  cleaned = cleaned.replace(/javascript\s*:/gi, "");
  
  // Remove data: protocol (can contain scripts)
  cleaned = cleaned.replace(/data\s*:/gi, "");
  
  // Remove vbscript: protocol
  cleaned = cleaned.replace(/vbscript\s*:/gi, "");
  
  // Remove on* event handlers (onclick, onerror, etc.)
  cleaned = cleaned.replace(/\bon\w+\s*=/gi, "");
  
  // Remove expression() CSS function (IE XSS vector)
  cleaned = cleaned.replace(/expression\s*\(/gi, "");
  
  return cleaned;
}

/**
 * Normalize whitespace - collapse multiple spaces, trim
 */
function normalizeWhitespace(text: string): string {
  return text
    .replace(/\s+/g, " ") // Collapse multiple whitespace to single space
    .trim();
}

/**
 * Main sanitization function
 * Cleans user input to prevent XSS attacks
 * 
 * @param input - Raw user input
 * @param maxLength - Optional maximum length (default 500)
 * @returns Sanitized string safe for storage and display
 */
export function sanitizeUserInput(input: string, maxLength: number = 500): string {
  if (!input || typeof input !== "string") {
    return "";
  }
  
  let sanitized = input;
  
  // Step 1: Decode HTML entities so we can properly detect and remove tags
  sanitized = decodeHTMLEntities(sanitized);
  
  // Step 2: Strip all HTML tags
  sanitized = stripHTMLTags(sanitized);
  
  // Step 3: Remove dangerous patterns
  sanitized = removeDangerousPatterns(sanitized);
  
  // Step 4: Normalize whitespace
  sanitized = normalizeWhitespace(sanitized);
  
  // Step 5: Truncate to max length
  if (sanitized.length > maxLength) {
    sanitized = sanitized.slice(0, maxLength);
  }
  
  return sanitized;
}

/**
 * Sanitize a name field (more restrictive)
 * Only allows alphanumeric, spaces, hyphens, apostrophes, and periods
 */
export function sanitizeName(input: string, maxLength: number = 100): string {
  if (!input || typeof input !== "string") {
    return "";
  }
  
  // First apply general sanitization
  let sanitized = sanitizeUserInput(input, maxLength);
  
  // Then only keep allowed characters for names
  // Allows: letters (including unicode), numbers, spaces, hyphens, apostrophes, periods
  sanitized = sanitized.replace(/[^\p{L}\p{N}\s\-'.]/gu, "");
  
  return sanitized.trim();
}

