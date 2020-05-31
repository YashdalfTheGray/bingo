import Component from '@bingo/client/Component';

import './header.scss';

export default class Header extends Component {
  constructor() {
    super('Header');
  }

  public render() {
    return `
      <div class="app-header flex-row">
        <div>This is the header</div>
      </div>
    `;
  }
}
