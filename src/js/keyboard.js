import Strings from './strings.js';
import HtmlHelper from './html-helper.js';

export default class Keyboard {
  constructor(keys) {
    this.strings = new Strings().strings;
    this.LOCALE_RU = 'Ru';
    this.LOCALE_EN = 'En';
    this.keys = keys;
    this.rows = document.querySelectorAll('.keyboard__row');
    this.locale = this.getLocale();
    this.shiftKeyPressed = false;
    this.helper = new HtmlHelper();

    this.tooltipOS = document.querySelector('.tooltip.current-os');
    this.tooltipHotKeys = document.querySelector('.tooltip.hot-keys');

  }

  refreshKeyboard() {
    for (const row of this.rows) {
      const buttons = row.querySelectorAll('.button');
      for (const button of buttons) {
        const buttonId = button.dataset.id;
        const captionSource = `key${this.locale}${this.shiftKeyPressed ? 'Shift' : ''}`;
        if (buttonId in this.keys && captionSource in this.keys[buttonId]) {
          button.textContent = this.keys[buttonId][captionSource] || '';
        }
      }
    }
    this.refreshTooltips();
  }

  refreshTooltips() {
    const os = this.strings[this.locale].tooltipOS;
    this.tooltipOS.textContent = os.replace('%1%', navigator.userAgentData.platform);
    this.tooltipHotKeys.textContent = this.strings[this.locale].tooltipHotKeys;
  }

  getLocale() {
    return 'Ru';
  }

  saveLocale() {
    throw new Error('Not implemented!');
  }

  init() {
    const main = this.helper.createElement({ tag: 'main' });
    const sectionDisplay = this.createSectionDisplay();
    const sectionKeyboard = this.createSectionKeyboard();
    const footer = this.createFooter();
    const script = this.helper.createElement({ tag: 'script', attr: { src: 'index.js', type: 'module' } });

    document.body.append(element);
    console.log('element: ', element);
  }

  createSectionDisplay() {
    return null;
  }
  sectionKeyboard() {
    return null;
  }

  sectionFooter() {
    return null;
  }
}