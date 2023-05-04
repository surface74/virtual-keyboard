import HtmlHelper from './html-helper.js';

export default class CaretCalculator {
  getCalculatorElement() {
    this.calculator = new HtmlHelper().createElement({
      tag: 'span', attr: { class: 'caret-calculator display_font', style: 'visibility: collapse' },
    });
    return this.calculator;
  }

  getUpperCaretPosition(string, caretPosition, elementWithRows) {
    this.calculator.textContent = '';
    const maxRowWidth = HtmlHelper.getCssWidth(elementWithRows);

    const firstInRows = [0];
    for (let i = 1; i < string.length; i += 1) {
      if (string[i - 1] === '\n') {
        if ((i - 1) < string.length - 1) {
          firstInRows.push(i);
          this.calculator.textContent = '';
          i += 1;
        } else {
          break;
        }
      }
      const str = string.slice(firstInRows[firstInRows.length - 1], i);
      this.calculator.textContent = str;
      if (maxRowWidth < HtmlHelper.getCssWidth(this.calculator)) {
        i -= 1;
        firstInRows.push(i);
        this.calculator.textContent = '';
      }
    }

    const row = firstInRows.reduce((acc, item, index) => {
      if (item > caretPosition && !acc) {
        return index;
      }
      return acc;
    }, 0);

    console.log('row: ', row);
    console.log('firstInRows: ', firstInRows);
    // console.log('string, this.calculatorWidth', `'${string} ': ${this.calculatorWidth}`);
  }

getLowerCaretPosition(string) {

}
}
