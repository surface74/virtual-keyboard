export default class Locales {
  constructor() {
    this.LOCALE_RU = 'Ru';
    this.LOCALE_EN = 'En';
  }

  getLocales() {
    return [this.LOCALE_EN, this.LOCALE_RU];
  }
}