export default function parseSVG(svg: string): HTMLElement | null {
  const parser = new DOMParser();
  const doc = parser.parseFromString(svg, 'image/svg+xml');
  if (doc.documentElement.nodeName !== 'svg') {
    throw new Error('Expected SVG element');
  }
  return doc.documentElement;
}
