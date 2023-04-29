import KeySet from './src/js/key-set.js';
import Keyboard from './src/js/keyboard.js';

const keySet = new KeySet();
const keyboard = new Keyboard(keySet.keys);

keyboard.init();
// keyboard.refreshKeyboard();