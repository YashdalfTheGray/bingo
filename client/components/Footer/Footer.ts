import Component from '@bingo/client/Component';

import './footer.scss';

export default class Footer extends Component {
  constructor() {
    super('Footer');
  }

  public render() {
    return `
    <div class="footer flex-row flex-item-static">
      <p>
        Designed and developed in the open by
        &nbsp;<a href="https://yashdalfthegray.github.io/" target="blank">Yash</a>.
        &nbsp;The code can be found
        &nbsp;<a href="https://github.com/YashdalfTheGray/bingo" target="blank">here</a>.
      </p>
    </div>
    `;
  }
}
