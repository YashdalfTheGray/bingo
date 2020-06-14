import Component from '@bingo/client/Component';

import Header from '@bingo/components/Header';
import Footer from '@bingo/components/Footer';
import Content from '@bingo/components/Content';
import ClipboardHelper from './components/ClipboardHelper';

export default class App extends Component {
  constructor() {
    super('App');
  }

  public render() {
    return `
      <div class="expand-to-fill-container flex-column">
        ${new Header().render()}
        ${new Content().render()}
        ${new Footer().render()}
        ${new ClipboardHelper().render()}
      </div>
    `;
  }
}
