import KeySet from './key-set.js';
import Strings from './strings.js';
import HtmlHelper from './html-helper.js';
import OsSensetiveCodes from './os-sensetive-codes.js';
import Locales from './locales.js';
import CaretCalculator from './caret-calculator.js';

export default class Keyboard {
  constructor() {
    this.strings = new Strings().getStrings();
    this.keys = new KeySet().getKeys();
    this.locales = new Locales().getLocales();
    this.currentLocale = this.getLocale();
    this.helper = new HtmlHelper();
    this.osSensetives = new OsSensetiveCodes();
    this.calculator = new CaretCalculator();

    this.shiftLeftPressed = false;
    this.shiftRightPressed = false;
    this.capsLockPressed = false;
    this.platform = navigator.userAgentData.platform;
    this.ignoredForPrint = ['Alt', 'Ctrl', 'CapsLock', 'Shift', 'Win', 'Cmd'];
    this.arrowKeys = ['ArrowLeft', 'ArrowRight', 'ArrowDown', 'ArrowUp'];
    this.lastClickedButtonId = null;
  }

  refreshKeyboard() {
    const rows = document.querySelectorAll('.keyboard__row');
    for (let i = 0; i < rows.length; i += 1) {
      const buttons = Array.from(rows[i].querySelectorAll('.button'));
      for (let j = 0; j < buttons.length; j += 1) {
        const buttonId = buttons[j].dataset.id;
        const captionSource = `key${this.currentLocale}${this.isShiftPressed() ? 'Shift' : ''}`;
        if (buttonId in this.keys && captionSource in this.keys[buttonId]) {
          let buttonCaption = this.keys[buttonId][captionSource] || '';
          if (this.capsLockPressed && Keyboard.isLetter(buttonCaption)) {
            buttonCaption = buttonCaption.toUpperCase();
          }
          if (this.osSensetives.isOsSensetive(buttonCaption)) {
            buttonCaption = (this.platform === 'Windows')
              ? this.osSensetives.codes[buttonCaption].windows
              : this.osSensetives.codes[buttonCaption].other;
          }

          buttons[j].textContent = buttonCaption;
        }
      }
    }
  }

  isShiftPressed() {
    return this.shiftLeftPressed || this.shiftRightPressed;
  }

  refreshTooltips() {
    const tooltipOS = document.querySelector('.footer__tooltip.current-os');
    const tooltipHotKeys = document.querySelector('.footer__tooltip.hot-keys');

    const os = this.strings.tooltipOS[this.currentLocale];
    tooltipOS.textContent = os.replace('%1', this.platform);
    tooltipHotKeys.textContent = this.strings.tooltipHotKeys[this.currentLocale];
  }

  getLocale() {
    let locale = localStorage.getItem('locale');
    if (!this.locales.includes(locale)) {
      [locale] = this.locales;
      Keyboard.saveLocale(locale);
    }

    return locale;
  }

  static saveLocale(locale) {
    localStorage.setItem('locale', locale);
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
    document.body.append(this.calculator.getCalculatorElement());

    this.display = document.querySelector('.display');
    this.keyboard = document.querySelector('.keyboard');
    this.addEventListeners();

    this.refreshKeyboard();
    this.refreshTooltips();
  }

  addEventListeners() {
    document.addEventListener('keydown', this.onKeydown.bind(this));
    document.addEventListener('keyup', this.onKeyup.bind(this));
    this.keyboard.addEventListener('pointerdown', this.onPointerdown.bind(this));
    this.keyboard.addEventListener('pointerup', this.onPointerup.bind(this));
    this.keyboard.addEventListener('pointerout', this.onPointerout.bind(this));
    this.display.addEventListener('click', this.checkShift.bind(this));
  }

  createSectionDisplay() {
    const section = this.createElement({ tag: 'section', attr: { class: 'display-section wrapper' } });
    const display = this.createElement({
      tag: 'textarea',
      attr: {
        class: 'display display_font', cols: '30', rows: '10', autofocus: true,
      },
    });
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
    for (let i = 0; i < 13; i += 1) {
      const button = this.createElement({ tag: 'button', attr: { class: 'button', type: 'button', 'data-id': `${i}` } });
      row.append(button);
    }
    const buttonBackspace = this.createElement({
      tag: 'button',
      attr: { class: 'button button_special button_double', type: 'button', 'data-id': '13' },
    });
    row.append(buttonBackspace);

    return row;
  }

  createButtonsRow_2() {
    const row = this.createElement({ attr: { class: 'keyboard__row' } });

    const buttonTab = this.createElement({
      tag: 'button',
      attr: { class: 'button button_special', type: 'button', 'data-id': '14' },
    });
    row.append(buttonTab);

    for (let i = 15; i < 28; i += 1) {
      const button = this.createElement({ tag: 'button', attr: { class: 'button', type: 'button', 'data-id': `${i}` } });
      row.append(button);
    }

    const buttonDel = this.createElement({
      tag: 'button',
      attr: { class: 'button button_special', type: 'button', 'data-id': '28' },
    });
    row.append(buttonDel);

    return row;
  }

  createButtonsRow_3() {
    const row = this.createElement({ attr: { class: 'keyboard__row' } });

    const buttonCapsLock = this.createElement({
      tag: 'button',
      attr: { class: 'button button_double button_special', type: 'button', 'data-id': '29' },
    });
    row.append(buttonCapsLock);

    for (let i = 30; i < 41; i += 1) {
      const button = this.createElement({ tag: 'button', attr: { class: 'button', type: 'button', 'data-id': `${i}` } });
      row.append(button);
    }

    const buttonEnter = this.createElement({
      tag: 'button',
      attr: { class: 'button button_double button_special', type: 'button', 'data-id': '41' },
    });
    row.append(buttonEnter);

    return row;
  }

  createButtonsRow_4() {
    const row = this.createElement({ attr: { class: 'keyboard__row' } });

    const buttonLeftShift = this.createElement({
      tag: 'button',
      attr: { class: 'button button_double button_special', type: 'button', 'data-id': '42' },
    });
    row.append(buttonLeftShift);

    for (let i = 43; i < 53; i += 1) {
      const button = this.createElement({ tag: 'button', attr: { class: 'button', type: 'button', 'data-id': `${i}` } });
      row.append(button);
    }

    const buttonArrowUp = this.createElement({
      tag: 'button',
      attr: { class: 'button button_special', type: 'button', 'data-id': '53' },
    });
    row.append(buttonArrowUp);

    const buttonRightShift = this.createElement({
      tag: 'button',
      attr: { class: 'button button_double button_special', type: 'button', 'data-id': '54' },
    });
    row.append(buttonRightShift);

    return row;
  }

  createButtonsRow_5() {
    const row = this.createElement({ attr: { class: 'keyboard__row' } });

    const buttonCtrl = this.createElement({
      tag: 'button',
      attr: { class: 'button button_special', type: 'button', 'data-id': '55' },
    });
    row.append(buttonCtrl);

    const buttonWin = this.createElement({
      tag: 'button',
      attr: { class: 'button button_special', type: 'button', 'data-id': '56' },
    });
    row.append(buttonWin);

    const buttonLeftAlt = this.createElement({
      tag: 'button',
      attr: { class: 'button button_special', type: 'button', 'data-id': '57' },
    });
    row.append(buttonLeftAlt);

    const buttonSpace = this.createElement({
      tag: 'button',
      attr: { class: 'button button_space button_special', type: 'button', 'data-id': '58' },
    });
    row.append(buttonSpace);

    for (let i = 59; i < 64; i += 1) {
      const button = this.createElement({
        tag: 'button', attr: { class: 'button button_special', type: 'button', 'data-id': `${i}` },
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

  checkShift(e) {
    // check if Shift didn't pressed, but some Shift-buttons highlighted
    if (!e.shiftKey && this.isShiftPressed()) {
      if (this.shiftLeftPressed) {
        this.shiftLeftPressed = this.lightToggleButton('ShiftLeft');
      }
      if (this.shiftRightPressed) {
        this.shiftRightPressed = this.lightToggleButton('ShiftRight');
      }
      this.refreshKeyboard();
    }
  }

  handleArrowButtonClick(code) {
    if (code === 'ArrowLeft') {
      if (this.display.selectionStart > 0) {
        this.display.selectionStart -= 1;
      }
    }

    if (code === 'ArrowRight') {
      if (this.display.selectionStart < this.display.value.length - 1) {
        this.display.selectionStart += 1;
      }
    }

    if (code === 'ArrowUp') {
      const position = this.calculator.getUpperCaretPosition(
        this.display.value,
        this.display.selectionStart,
        this.display,
      );

      // this.display.selectionStart = position;
    }

    if (code === 'ArrowDown') {
      const position = this.calculator.countLowerCaretPosition(
        this.display.value,
        this.display.selectionStart,
        this.display,
      );
      // this.display.selectionStart = position;
    }

    this.display.selectionEnd = this.display.selectionStart;
    this.display.focus();
  }

  onPointerout(e) {
    const { target } = e;
    if (!target.classList.contains('button')) {
      return;
    }

    const buttonId = target.dataset.id;
    if (this.lastClickedButtonId === buttonId) {
      this.lastClickedButtonId = null;
      this.lightOffButton(this.keys[buttonId].code);
    }
  }

  onPointerdown(e) {
    if (!e.target.classList.contains('button')) {
      return;
    }
    const buttonId = e.target.dataset.id;
    const { code } = this.keys[buttonId];

    if (this.arrowKeys.includes(code)) {
      this.handleArrowButtonClick(code);
      return;
    }

    if (code === 'CapsLock') {
      this.capsLockPressed = this.lightToggleButton(code);
      this.refreshKeyboard();
      return;
    }

    if (code.startsWith('Shift')) {
      if (code === 'ShiftLeft') {
        this.shiftLeftPressed = this.lightToggleButton(code);
      } else {
        this.shiftRightPressed = this.lightToggleButton(code);
      }

      this.refreshKeyboard();
      return;
    }

    this.lastClickedButtonId = buttonId;

    const caption = this.lightOnButton(code)?.textContent || '';
    if (caption) {
      this.processOutput(caption);
    }
  }

  onPointerup(e) {
    this.display.focus();
    if (!e.target.classList.contains('button')) {
      return;
    }
    const { code } = this.keys[e.target.dataset.id];

    if (code !== 'CapsLock' && !code.startsWith('Shift')) {
      this.lightOffButton(code);
    }
  }

  onKeydown(e) {
    if (this.arrowKeys.includes(e.code)) {
      this.lightOnButton(e.code);
      return;
    }

    e.preventDefault();
    this.display.focus();
    if ((e.code === 'AltLeft' && e.ctrlKey)
      || (e.code === 'ControlLeft' && e.altKey)) {
      this.toggleLocale();
      this.refreshKeyboard();
      this.lightOnButton(e.code);
      return;
    }

    if (e.code === 'CapsLock') {
      this.capsLockPressed = this.lightToggleButton(e.code);
      this.refreshKeyboard();
      return;
    }

    if (e.code.startsWith('Shift')) {
      if (e.code === 'ShiftLeft') {
        this.shiftLeftPressed = true;
      } else {
        this.shiftRightPressed = true;
      }

      this.lightOnButton(e.code);
      this.refreshKeyboard();
      return;
    }

    const caption = this.lightOnButton(e.code)?.textContent || '';
    if (caption) {
      this.processOutput(caption);
    }
  }

  onKeyup(e) {
    if (e.code.startsWith('Shift')) {
      if (e.code === 'ShiftLeft') {
        this.shiftLeftPressed = false;
      } else {
        this.shiftRightPressed = false;
      }

      this.lightOffButton(e.code);

      // check that Shift really pressed
      if (this.isShiftPressed()) {
        this.display.click();
      }

      this.refreshKeyboard();
      return;
    }

    if (e.code !== 'CapsLock') {
      this.lightOffButton(e.code);
    }
  }

  toggleLocale() {
    this.currentLocale = (this.currentLocale === this.locales[0])
      ? this.locales[1]
      : this.locales[0];

    Keyboard.saveLocale(this.currentLocale);
    this.refreshTooltips();
  }

  lightToggleButton(code) {
    return this.getButton(code).classList.toggle('button_active');
  }

  lightOnButton(code) {
    const button = this.getButton(code);
    if (button) {
      button.classList.add('button_active');
    }

    return button;
  }

  lightOffButton(code) {
    const button = this.getButton(code);
    if (button) {
      button.classList.remove('button_active');
    }
  }

  processOutput(keyCaption) {
    if (this.ignoredForPrint.includes(keyCaption)) {
      return;
    }

    switch (keyCaption) {
      case 'Tab':
        this.printLetter('  ');
        break;
      case 'Enter':
        this.printLetter('\n');
        break;
      case 'Del':
        this.deleteLetter();
        break;
      case 'Backspace':
        this.backspaceLetter();
        break;
      default:
        this.printLetter(keyCaption);
    }
  }

  backspaceLetter() {
    const { value } = this.display;
    if (!value.length || !this.display.selectionStart) {
      return;
    }
    const startPart = value.slice(0, this.display.selectionStart - 1);
    const endPart = value.slice(this.display.selectionStart);
    this.display.value = `${startPart}${endPart}`;
    this.display.selectionStart = startPart.length;
    this.display.selectionEnd = startPart.length;
  }

  deleteLetter() {
    const { value } = this.display;
    if (!value.length || value.length === this.display.selectionStart) {
      return;
    }
    const startPart = value.slice(0, this.display.selectionStart);
    const endPart = value.slice(this.display.selectionStart + 1);
    this.display.value = `${startPart}${endPart}`;
    this.display.selectionStart = startPart.length;
    this.display.selectionEnd = startPart.length;
  }

  printLetter(input) {
    const { value } = this.display;
    const startPart = value.slice(0, this.display.selectionStart);
    const endPart = value.slice(this.display.selectionStart);
    this.display.value = `${startPart}${input}${endPart}`;
    this.display.selectionStart = `${startPart}${input}`.length;
    this.display.selectionEnd = this.display.selectionStart;
  }

  getButton(code) {
    let button = null;
    const keys = Array.from(Object.values(this.keys));

    for (let i = 0; i < keys.length; i += 1) {
      if (this.keys[i].code === code) {
        button = document.querySelector(`[data-id="${i}"]`);
        break;
      }
    }

    return button;
  }

  static isLetter(key) {
    return key.length === 1 && !!key.match(/[a-zа-яё]/);
  }
}
