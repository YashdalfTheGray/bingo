import Component from '@bingo/client/Component';

import { decodeColumns, hashColumns } from '@bingo/common/cardUtils';

interface ICardProps {
  card: string;
}

export default class Card extends Component<ICardProps> {
  constructor(props: ICardProps) {
    super('Card', props);
  }

  public render() {
    try {
      const { card } = this.props;
      const [hash, ...cols] = card.split('-');
      const colsToDisplay = decodeColumns(cols);

      if (hashColumns(colsToDisplay) !== hash) {
        throw new Error('Card hash mismatch');
      }

      return `
        <div class="flex-row">
          ${colsToDisplay.map((r) => this.renderRow(r)).join('&nbsp;')}
        </div>
      `;
    } catch (err) {
      return '<div>Invalid card numbers! Please check the link.</div>';
    }
  }

  private renderRow = (nums: number[]) =>
    `<div class="flex-column">${nums
      .map((e) => `<span>${e}</span>`)
      .join('')}</div>`;
}
