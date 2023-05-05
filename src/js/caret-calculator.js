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

    if (firstInRows.length === 1) { // there's just one row - do nothing
      return caretPosition;
    }

    const currentRow = { row: 0, startLetter: 0, lastLetter: 0 };
    for (let i = 0; i < firstInRows.length; i += 1) {
      if (caretPosition >= firstInRows[i]) {
        currentRow.row = i;
        currentRow.startLetter = firstInRows[i];
        currentRow.lastLetter = (i === firstInRows.length - 1)
          ? string.length - 1
          : firstInRows[i + 1] - 1;
      } else {
        break;
      }
    }

    if (currentRow.row === 0) { // on the top - do nothing
      return caretPosition;
    }

    const offset = caretPosition - currentRow.startLetter;
    const caretPos = (firstInRows[currentRow.row] - firstInRows[currentRow.row - 1] < offset)
      ? firstInRows[currentRow.row] - 1
      : firstInRows[currentRow.row - 1] + offset;

    console.log('firstInRows: ', firstInRows);
    console.log(`${currentRow.row}: ${currentRow.startLetter} -${currentRow.lastLetter}, carret: ${caretPosition} `);
    console.log('offset: ', offset);
    console.log('caretPos: ', caretPos);

    return caretPos;
  }

  getLowerCaretPosition(string) {

  }
}
