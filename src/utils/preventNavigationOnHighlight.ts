/**
 * Avoid triggering row/click navigation when the user is highlighting
 * (selecting) text, so a drag selection doesn't accidentally open a record.
 */

export function hasTextSelection(): boolean {
  return Boolean(window.getSelection()?.toString());
}

export function preventNavigationOnHighlight(handler: () => void): () => void {
  return () => {
    if (hasTextSelection()) {
      return;
    }
    handler();
  };
}

export default preventNavigationOnHighlight;
