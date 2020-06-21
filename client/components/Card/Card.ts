import Component from '@bingo/client/Component';

import { decodeColumns, hashColumns } from '@bingo/common/cardUtils';

import * as close from '@bingo/client/icons/close.svg';

import './card.scss';

interface ICardProps {
  card: string;
}

export default class Card extends Component<ICardProps> {
  constructor(props: ICardProps) {
    super('Card', props);
  }

  public handleNumberClick(row: number, column: number) {
    if (row === 0) {
      return;
    }

    const visibleClassName = 'visible';
    const cross = document.querySelector(
      `.number-container[data-row="${row}"][data-column="${column}"] > .number-cross`
    );

    if (cross?.classList.contains(visibleClassName)) {
      cross.classList.remove(visibleClassName);
    } else {
      cross?.classList.add(visibleClassName);
    }
  }

  public render() {
    try {
      const { card } = this.props;
      const [hash, ...cols] = card.split('-');
      const colsToDisplay = decodeColumns(cols);

      const bingoHeader = ['B', 'I', 'N', 'G', 'O'];

      if (hashColumns(colsToDisplay) !== hash) {
        throw new Error('Card hash mismatch');
      }

      return `
        <div class="card grid-container">
          ${colsToDisplay
            .map((c, col) =>
              [bingoHeader[col], ...c]
                .map(
                  (e, row) =>
                    `<span
                      class="number-container${
                        typeof e === 'string' ? ' is-header' : ''
                      }"
                      data-row="${row}"
                      data-column="${col + 1}"
                      onClick="${this.callClassFunction(
                        'handleNumberClick',
                        row,
                        col + 1
                      )}">
                        <span
                          class="number"
                          style="--animation-order: ${col + row};">
                          ${e === 0 ? '' : e}
                        </span>
                        ${
                          row !== 0
                            ? `<span class="number-cross">${close}</span>`
                            : ''
                        }
                      </span>`
                )
                .join('\n')
            )
            .join('\n')}
        </div>
      `;
    } catch (err) {
      return '<div>Invalid card numbers! Please check the link.</div>';
    }
  }
}
