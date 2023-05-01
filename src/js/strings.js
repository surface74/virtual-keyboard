export default class Strings {
  constructor() {
    this.strings = {
      tooltipOS: {
        Ru: 'Клавиатура создана в операционной системе %1',
        En: 'Keyboard was created in OS %1',
      },
      tooltipHotKeys: {
        Ru: 'Для переключения языка комбинация: левый Ctrl + Alt',
        En: 'To switch locale press: left Ctrl + Alt',
      },
    };
  }

  getStrings() {
    return this.strings;
  }
}
