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
    const main = this.createElement({ tag: 'main' });
    const sectionDisplay = this.createSectionDisplay();
    const sectionKeyboard = this.createSectionKeyboard();
    const footer = this.createFooter();

    main.append(sectionDisplay);
    main.append(sectionKeyboard);
    document.body.prepend(main);
  }

  createSectionDisplay() {
    const section = this.createElement({ tag: 'section', attr: { class: 'display-section wrapper' } });
    const display = this.createElement({ tag: 'textarea', attr: { class: 'display', cols: '30', rows: '10' } });
    section.append(display);

    return section;
  }

  createSectionKeyboard() {
    const section = this.createElement({ tag: 'section', attr: { class: 'keyboard-section wrapper' } });
    const wrapper = this.createElement({ attr: { class: 'keyboard' } });
    wrapper.append(this.createButtonsRow_1());
    wrapper.append(this.createButtonsRow_2());
    wrapper.append(this.createButtonsRow_3());
    wrapper.append(this.createButtonsRow_4());
    wrapper.append(this.createButtonsRow_5());

    section.append(wrapper);

    return section;
  }

  createButtonsRow_1() {
    const row = this.createElement({ attr: { class: 'keyboard__row' } });
    for (let i = 0; i < 13; i++) {
      const button = this.createElement({ tag: 'button', attr: { class: 'button', type: 'button', 'data-id': `${i}`} });
      row.append(button);
    }
    const buttonBackspace = this.createElement({
      tag: 'button',
      attr: { class: 'button button_special button_double', type: 'button' , 'data-id': '13'}
    });
    row.append(buttonBackspace);

    return row;
  }

  createButtonsRow_2() {
    const row = this.createElement({ attr: { class: 'keyboard__row' } });

    const buttonTab = this.createElement({
      tag: 'button',
      attr: { class: 'button button_special', type: 'button' , 'data-id': '14'}
    });
    row.append(buttonTab);

    for (let i = 15; i < 28; i++) {
      const button = this.createElement({ tag: 'button', attr: { class: 'button', type: 'button', 'data-id': `${i}`} });
      row.append(button);
    }

    const buttonDel = this.createElement({
      tag: 'button',
      attr: { class: 'button button_special', type: 'button' , 'data-id': '28'}
    });
    row.append(buttonDel);

    return row;
  }

  createButtonsRow_3() {
    const row = this.createElement({ attr: { class: 'keyboard__row' } });

    const buttonCapsLock = this.createElement({
      tag: 'button',
      attr: { class: 'button button_double button_special', type: 'button' , 'data-id': '29'}
    });
    row.append(buttonCapsLock);

    for (let i = 30; i < 41; i++) {
      const button = this.createElement({ tag: 'button', attr: { class: 'button', type: 'button', 'data-id': `${i}`} });
      row.append(button);
    }

    const buttonEnter = this.createElement({
      tag: 'button',
      attr: { class: 'button button_double button_special', type: 'button' , 'data-id': '41'}
    });
    row.append(buttonEnter);

    return row;
  }

  createButtonsRow_4() {
    const row = this.createElement({ attr: { class: 'keyboard__row' } });

    const buttonLeftShift = this.createElement({
      tag: 'button',
      attr: { class: 'button button_double button_special', type: 'button' , 'data-id': '42'}
    });
    row.append(buttonLeftShift);

    for (let i = 43; i < 53; i++) {
      const button = this.createElement({ tag: 'button', attr: { class: 'button', type: 'button', 'data-id': `${i}`} });
      row.append(button);
    }

    const buttonArrowUp = this.createElement({
      tag: 'button',
      attr: { class: 'button button_special', type: 'button' , 'data-id': '53'}
    });
    row.append(buttonArrowUp);

    const buttonRightShift = this.createElement({
      tag: 'button',
      attr: { class: 'button button_double button_special', type: 'button' , 'data-id': '54'}
    });
    row.append(buttonRightShift);

    return row;
  }

  createButtonsRow_5() {
    const row = this.createElement({ attr: { class: 'keyboard__row' } });

    const buttonCtrl = this.createElement({
      tag: 'button',
      attr: { class: 'button button_special', type: 'button' , 'data-id': '55'}
    });
    row.append(buttonCtrl);

    const buttonWin = this.createElement({
      tag: 'button',
      attr: { class: 'button button_special', type: 'button' , 'data-id': '56'}
    });
    row.append(buttonWin);

    const buttonLeftAlt = this.createElement({
      tag: 'button',
      attr: { class: 'button button_special', type: 'button' , 'data-id': '57'}
    });
    row.append(buttonLeftAlt);

    const buttonSpace = this.createElement({
      tag: 'button',
      attr: { class: 'button button_space button_special', type: 'button' , 'data-id': '58'}
    });
    row.append(buttonSpace);

    for (let i = 59; i < 64; i++) {
      const button = this.createElement({
         tag: 'button', attr: { class: 'button button_special', type: 'button', 'data-id': `${i}`}
        });
      row.append(button);
    }

    return row;
  }

  createFooter() {
    return null;
  }

  createElement(elementInfo) {
    return this.helper.createElement(elementInfo);
  }
}