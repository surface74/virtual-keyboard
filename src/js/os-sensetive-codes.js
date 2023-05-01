export default class OsSensetiveCodes {
  constructor() {
    this.codes = {
      Meta: { windows: 'Win', other: 'Cmd' },
      Enter: { windows: 'Enter', other: 'Return' },
      Alt: { windows: 'Alt', other: 'Opt' },
    };
  }

  getCodes() {
    return this.codes;
  }

  isOsSensetive(code) {
    return Array.from(Object.keys(this.codes)).includes(code);
  }
}
