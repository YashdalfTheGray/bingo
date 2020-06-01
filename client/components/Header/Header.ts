import Component from '@bingo/client/Component';

import './header.scss';

export default class Header extends Component {
  constructor() {
    super('Header');
  }

  public render() {
    return `
      <div class="bingo-header flex-row">
        <div class="title">BINGO</div>
      </div>
    `;
  }
}
