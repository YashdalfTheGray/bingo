import Component from '@bingo/client/Component';

import './footer.scss';

export default class Footer extends Component {
  constructor() {
    super('Footer');
  }

  public render() {
    return `
    <div class="footer flex-row">
      <p>
        Designed and developed in the open by
        &nbsp;<a href="">Yash</a>. The code can be found
        &nbsp;<a href="">here</a>.
      </p>
    </div>
    `;
  }
}
