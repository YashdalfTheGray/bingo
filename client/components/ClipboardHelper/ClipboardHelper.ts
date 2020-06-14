import Component from '@bingo/client/Component';

import './clipboardHelper.scss';

export default class ClipboardHelper extends Component {
  constructor() {
    super('ClipboardHelper');
  }

  // TODO YashdalfTheGray 2020/06/13
  // need to prevent this element from scrolling into focus
  // and since different browsers have inconsistent behavior
  // around this, should just sticky this input tag to a corner
  // of the viewport rather than a corner of the document

  public render() {
    return `
      <input
        id="clipboard-helper-input"
        class="clipboard-helper"
        type="text"
        readonly
      ></input>
    `;
  }
}
