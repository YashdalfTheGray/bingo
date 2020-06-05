import Component from '@bingo/client/Component';
import Card from '@bingo/components/Card';
import Generator from '@bingo/components/Generator';

import './content.scss';

interface IContentState {
  queryParams: { [k: string]: string };
}

export default class Content extends Component<{}, IContentState> {
  constructor() {
    super('Content');

    this.state = {
      queryParams: [
        ...new URLSearchParams(window.location.search).entries(),
      ].reduce(
        (acc, [key, value]) => ({
          ...acc,
          [key]: value,
        }),
        {}
      ),
    };
  }

  public render() {
    const {
      queryParams: { card: card },
    } = this.state;

    return `
      <div class="content flex-column flex-item-expand">
        ${card ? new Card({ card }).render() : new Generator().render()}
      </div>
    `;
  }
}
