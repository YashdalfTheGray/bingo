import Component from '@bingo/client/Component';

import './header.scss';

export default class Header extends Component {
  constructor() {
    super('Header');
  }

  public render() {
    return `
      <div class="bingo-header flex-row flex-item-static">
        <div class="title">BINGO</div>
      </div>
    `;
  }
}
