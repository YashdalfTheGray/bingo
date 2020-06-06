import Component from '@bingo/client/Component';

import './header.scss';

export default class Header extends Component {
  constructor() {
    super('Header');
  }

  public render() {
    return `
      <div class="bingo-header flex-row flex-item-static">
        <div class="title">B&nbsp;I&nbsp;N&nbsp;G&nbsp;O</div>
      </div>
    `;
  }
}
