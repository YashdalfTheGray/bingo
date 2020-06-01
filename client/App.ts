import Component from './Component';

import Header from '@bingo/components/Header';
import Footer from '@bingo/components/Footer';

export default class App extends Component {
  constructor() {
    super('App');
  }

  public render() {
    return `
      <div class="flex-column">
        ${new Header().render()}
        <div>is</div>
        <div>a</div>
        <div>test</div>
        ${new Footer().render()}
      </div>
    `;
  }
}
