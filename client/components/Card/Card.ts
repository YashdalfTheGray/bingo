import Component from '@bingo/client/Component';

import { decodeColumns, hashColumns } from '@bingo/common/cardUtils';

import './card.scss';

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
        <div class="card grid-container">
          ${colsToDisplay
            .map((c) => c.map((e) => `<span>${e}</span>`).join('\n'))
            .join('\n')}
        </div>
      `;
    } catch (err) {
      return '<div>Invalid card numbers! Please check the link.</div>';
    }
  }
}
