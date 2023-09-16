import Component from '@bingo/client/Component';
import { getOneCard } from '@bingo/client/service';
import type { IBingoCard } from '@bingo/client/types';

import CardDetailRow from '@bingo/components/CardDetailRow';

import './generator.scss';

interface IGeneratorState {
  cards: IBingoCard[];
}

export default class Generator extends Component<object, IGeneratorState> {
  constructor() {
    super('Generator');

    this.state = {
      cards: [],
    };
  }

  public async generateCards() {
    const numberInput =
      document.querySelector<HTMLInputElement>('#card-number-input');

    this.handleInputChanged();

    const numberOfCards = parseInt(numberInput!.value, 10);

    if (!this.validateCardNumber(numberOfCards)) {
      return;
    }

    const cards = await Promise.all(
      new Array(parseInt(numberInput!.value, 10))
        .fill(window.location.href)
        .map(async (l) => {
          let firstTime = true;
          let hash = '';
          let card: string = '';
          while (firstTime || !this.isUniqueCard(hash)) {
            if (firstTime) {
              firstTime = false;
            }
            card = await getOneCard();
            hash = card.split('-')[0];
          }

          return {
            link: `${l}?card=${card}`,
            hash: card.split('-')[0],
            content: card,
          };
        }),
    );

    this.setState({ cards });

    document.querySelector('#card-links-container')!.innerHTML =
      this.state.cards
        .map((c) => new CardDetailRow({ card: c }).render())
        .join('');
  }

  public handleInputChanged() {
    const numberInput =
      document.querySelector<HTMLInputElement>('#card-number-input');
    const value = parseInt(numberInput!.value, 10);
    if (!this.validateCardNumber(value)) {
      numberInput?.classList.add('validation-error');
    } else {
      numberInput?.classList.remove('validation-error');
    }
  }

  public render() {
    return `
      <div class="generator flex-column flex-item-dynamic">
        <div class="flex-row">
          <input
            id="card-number-input"
            type="number"
            placeholder="A number, e.g. 5"/>
          <button
            id="generate-button"
            class="button">
            Generate
          </button>
        </div>
        <div id="card-links-container" class="flex-column">
          <div class="empty-message">
            Enter the number of players and click generate to generate bingo card links.
          </div>
        </div>
      </div>
    `;
  }

  private isUniqueCard = (hash: string) =>
    !this.state.cards.map((c) => c.hash).includes(hash);

  private validateCardNumber = (val: number) => !!val && val > 0;
}
