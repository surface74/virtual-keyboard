export default class HtmlHelper {
  createElement({ tag = 'div', text = '', attr = {} } = {}) {
    this.elem = document.createElement(tag);
    if (text) {
      this.elem.textContent = text;
    }

    const entries = Array.from(Object.entries(attr));
    for (let i = 0; i < entries.length; i += 1) {
      const [key, value] = entries[i];
      this.elem.setAttributeNode(document.createAttribute(key));
      this.elem.setAttribute(key, value);
    }
    return this.elem;
  }

  static getCssWidth(element) {
    const { width } = element.getBoundingClientRect();
    const { paddingLeft, paddingRight } = getComputedStyle(element);
    const { borderLeftWidth, borderRightWidth } = getComputedStyle(element);

    const cssWidth = width
      - Number.parseInt(paddingLeft, 10)
      - Number.parseInt(paddingRight, 10)
      - Number.parseFloat(borderLeftWidth)
      - Number.parseFloat(borderRightWidth);

    return cssWidth;
  }
}
