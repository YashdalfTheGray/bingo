import Component from '@bingo/client/Component';

import { decodeColumns, hashColumns } from '@bingo/common/cardUtils';

interface ICardProps {
  card: string;
}

export default class Card extends Component<ICardProps> {
  constructor(props: ICardProps) {
    super('Card');

    this.props = props;
  }

  public render() {
    const { card } = this.props;
    const [hash, ...cols] = card.split('-');
    const colsToDisplay = decodeColumns(cols);

    if (hashColumns(colsToDisplay) !== hash) {
      return '<div>Invalid card numbers! Please check the link.</div>';
    }

    return `
      <div class="flex-row">
        ${colsToDisplay.map((r) => this.renderRow(r)).join('&nbsp;')}
      </div>
    `;
  }

  private renderRow = (nums: number[]) =>
    `<div class="flex-column">${nums
      .map((e) => `<span>${e}</span>`)
      .join('')}</div>`;
}
