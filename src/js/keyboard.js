import Strings from './strings.js';
import HtmlHelper from './html-helper.js';
import OsSensetiveCodes from './os-sensetive-codes.js';

export default class Keyboard {
  constructor(keys) {
    this.strings = new Strings().strings;
    this.LOCALE_RU = 'Ru';
    this.LOCALE_EN = 'En';
    this.keys = keys;
    this.locale = this.getLocale();
    this.shiftKeyPressed = false;
    this.capsLockPressed = false;
    this.helper = new HtmlHelper();
    this.osSensetives = new OsSensetiveCodes();
    this.platform = 'Mac'; //navigator.userAgentData.platform;
  }

  refreshKeyboard() {
    const rows = document.querySelectorAll('.keyboard__row');
    for (const row of rows) {
      const buttons = row.querySelectorAll('.button');
      for (const button of buttons) {
        const buttonId = button.dataset.id;
        const captionSource = `key${this.locale}${this.shiftKeyPressed ? 'Shift' : ''}`;
        if (buttonId in this.keys && captionSource in this.keys[buttonId]) {
          let buttonCaption = this.keys[buttonId][captionSource] || '';
          if (this.capsLockPressed && this.isLetter(buttonCaption)) {
            buttonCaption = buttonCaption.toUpperCase();
          }
          if (this.osSensetives.isOsSensetive(buttonCaption)) {
            buttonCaption = (this.platform === 'Windows')
            ? this.osSensetives.keys[buttonCaption].windows
            : this.osSensetives.keys[buttonCaption].other;
          }

          button.textContent = buttonCaption;
        }
      }
    }
  }

  refreshTooltips() {
    const os = this.strings[this.locale].tooltipOS;
    const tooltipOS = document.querySelector('.footer__tooltip.current-os');
    const tooltipHotKeys = document.querySelector('.footer__tooltip.hot-keys');
    tooltipOS.textContent = os.replace('%1', this.platform);
    tooltipHotKeys.textContent = this.strings[this.locale].tooltipHotKeys;
  }

  getLocale() {
    return this.LOCALE_EN;
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

    document.body.prepend(footer);
    document.body.prepend(main);

    this.display = document.querySelector('.display');
    this.addEventListeners();
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
      const button = this.createElement({ tag: 'button', attr: { class: 'button', type: 'button', 'data-id': `${i}` } });
      row.append(button);
    }
    const buttonBackspace = this.createElement({
      tag: 'button',
      attr: { class: 'button button_special button_double', type: 'button', 'data-id': '13' }
    });
    row.append(buttonBackspace);

    return row;
  }

  createButtonsRow_2() {
    const row = this.createElement({ attr: { class: 'keyboard__row' } });

    const buttonTab = this.createElement({
      tag: 'button',
      attr: { class: 'button button_special', type: 'button', 'data-id': '14' }
    });
    row.append(buttonTab);

    for (let i = 15; i < 28; i++) {
      const button = this.createElement({ tag: 'button', attr: { class: 'button', type: 'button', 'data-id': `${i}` } });
      row.append(button);
    }

    const buttonDel = this.createElement({
      tag: 'button',
      attr: { class: 'button button_special', type: 'button', 'data-id': '28' }
    });
    row.append(buttonDel);

    return row;
  }

  createButtonsRow_3() {
    const row = this.createElement({ attr: { class: 'keyboard__row' } });

    const buttonCapsLock = this.createElement({
      tag: 'button',
      attr: { class: 'button button_double button_special', type: 'button', 'data-id': '29' }
    });
    row.append(buttonCapsLock);

    for (let i = 30; i < 41; i++) {
      const button = this.createElement({ tag: 'button', attr: { class: 'button', type: 'button', 'data-id': `${i}` } });
      row.append(button);
    }

    const buttonEnter = this.createElement({
      tag: 'button',
      attr: { class: 'button button_double button_special', type: 'button', 'data-id': '41' }
    });
    row.append(buttonEnter);

    return row;
  }

  createButtonsRow_4() {
    const row = this.createElement({ attr: { class: 'keyboard__row' } });

    const buttonLeftShift = this.createElement({
      tag: 'button',
      attr: { class: 'button button_double button_special', type: 'button', 'data-id': '42' }
    });
    row.append(buttonLeftShift);

    for (let i = 43; i < 53; i++) {
      const button = this.createElement({ tag: 'button', attr: { class: 'button', type: 'button', 'data-id': `${i}` } });
      row.append(button);
    }

    const buttonArrowUp = this.createElement({
      tag: 'button',
      attr: { class: 'button button_special', type: 'button', 'data-id': '53' }
    });
    row.append(buttonArrowUp);

    const buttonRightShift = this.createElement({
      tag: 'button',
      attr: { class: 'button button_double button_special', type: 'button', 'data-id': '54' }
    });
    row.append(buttonRightShift);

    return row;
  }

  createButtonsRow_5() {
    const row = this.createElement({ attr: { class: 'keyboard__row' } });

    const buttonCtrl = this.createElement({
      tag: 'button',
      attr: { class: 'button button_special', type: 'button', 'data-id': '55' }
    });
    row.append(buttonCtrl);

    const buttonWin = this.createElement({
      tag: 'button',
      attr: { class: 'button button_special', type: 'button', 'data-id': '56' }
    });
    row.append(buttonWin);

    const buttonLeftAlt = this.createElement({
      tag: 'button',
      attr: { class: 'button button_special', type: 'button', 'data-id': '57' }
    });
    row.append(buttonLeftAlt);

    const buttonSpace = this.createElement({
      tag: 'button',
      attr: { class: 'button button_space button_special', type: 'button', 'data-id': '58' }
    });
    row.append(buttonSpace);

    for (let i = 59; i < 64; i++) {
      const button = this.createElement({
        tag: 'button', attr: { class: 'button button_special', type: 'button', 'data-id': `${i}` }
      });
      row.append(button);
    }

    return row;
  }

  createFooter() {
    const footer = this.createElement({ tag: 'footer', attr: { class: 'footer wrapper' } });
    footer.append(this.createElement({ tag: 'p', attr: { class: 'footer__tooltip current-os' } }));
    footer.append(this.createElement({ tag: 'p', attr: { class: 'footer__tooltip hot-keys' } }));

    return footer;
  }

  createElement(elementInfo) {
    return this.helper.createElement(elementInfo);
  }

  addEventListeners() {
    document.addEventListener('keydown', this.onKeydown.bind(this));
    document.addEventListener('keyup', this.onKeyup.bind(this));
    // this.keyboard.addEventListener('pointerdown', this.onPointerdown);
  }


  onKeydown(e) {
    e.preventDefault();
    if (e.code !== 'CapsLock') {
      this.lightOnButton(e.keyCode, e.code);
    } else {
      this.capsLockPressed = this.lightToggleButton(e.keyCode, e.code);
      this.refreshKeyboard();
    }
    this.print(e.key);
  }

  onKeyup(e) {
    if (e.code !== 'CapsLock') {
      this.lightOffButton(e.keyCode, e.code);
      this.print(e.key);
    }
  }

  lightToggleButton(keyCode, code) {
    const button = this.getButton(keyCode, code);
    if (button) {
      return button.classList.toggle('button_active');
    }
  }

  lightOnButton(keyCode, code) {
    const button = this.getButton(keyCode, code);
    if (button) {
      button.classList.add('button_active');
    }
  }

  lightOffButton(keyCode, code) {
    const button = this.getButton(keyCode, code);
    if (button) {
      button.classList.remove('button_active');
    }
  }

  print(key) {
    console.log('print', key);
  }

  getButton(keyCode, code) {
    let button = null;
    for (const key in Object.values(this.keys)) {
      if (this.keys[key].keyCode === keyCode && this.keys[key].code === code) {
        button = document.querySelector(`[data-id="${key}"]`);
        break;
      }
    }

    return button;
  }

  isLetter(key) {
    return key.length === 1 && !!key.match(/[a-zа-яё]/);
  }

  isSpecial(key) {
    return key.length > 1;
  }
}