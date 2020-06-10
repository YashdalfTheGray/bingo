import Component from '@bingo/client/Component';
import type { IBingoCard } from '@bingo/client/types';
import { tryToCopyLink } from '@bingo/client/util';

import * as share from '@bingo/client/icons/share.svg';
import * as done from '@bingo/client/icons/done.svg';

import './cardDetailRow.scss';

interface ICardDetailRowProps {
  card: IBingoCard;
}

export default class CardDetailRow extends Component<ICardDetailRowProps> {
  constructor(props: ICardDetailRowProps) {
    super('CardDetailRow', props);
  }

  public async handleCardCopy(card: string, hash: string) {
    const result = await tryToCopyLink(card);
    if (result) {
      const thisRow = document.querySelector(
        `.card-detail-row[data-card-hash="${hash}"]`
      );

      const doneMarker = thisRow?.querySelector('span.done-icon');
      doneMarker?.classList.add('visible');
    }
  }

  public render() {
    const { card } = this.props;

    return `
    <div class="flex-row card-detail-row" data-card-hash="${card.hash}">
      <span class="card-number">
        Card #${parseInt(card.hash, 16).toString(10)}
      </span>
      <span class="card-actions flex-row">
        <button
          class="icon button copy-button"
          onClick="${this.callClassFunction(
            'handleCardCopy',
            card.link,
            card.hash
          )}">
          ${share}
        </button>
        <span class="icon done-icon">${done}</span>
      </span>
    </div>
  `;
  }
}
