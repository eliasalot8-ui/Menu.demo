/**
 * Minimal, dependency-free text splitter: wraps each word in a masked
 * span so GSAP can animate translateY inside an overflow:clip parent
 * without relying on a paid SplitText plugin.
 */
export function splitWords(text) {
  return text
    .split(" ")
    .filter(Boolean)
    .map((word, i) => ({ word, key: `${word}-${i}` }));
}
