export default class HtmlHelper {
  createElement({ tag = 'div', text = '', attr = {} } = {}) {
    if (tag) {
      const elem = document.createElement(tag);
      if (text) {
        elem.textContent = text;
      }
      for (const key in attr) {
        elem.setAttributeNode(document.createAttribute(key));
        elem.setAttribute(key, attr[key]);
      }
      return elem;
    } else {
      return null;
    }
  }
}