export default class OsSensetiveCodes {
  get codes() {
    return {
      'Meta': { windows: 'Win', other: 'Cmd' },
      'Enter': { windows: 'Enter', other: 'Return' },
      'Alt': { windows: 'Alt', other: 'Opt' }
    };
  }

  isOsSensetive(code) {
    return Array.from(Object.keys(this.codes)).includes(code);
  }
}