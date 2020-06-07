import Component from '@bingo/client/Component';
import { getOneCard } from '@bingo/client/service';

import './generator.scss';

interface IGeneratorState {
  cards: string[];
}

export default class Generator extends Component<{}, IGeneratorState> {
  constructor() {
    super('Generator');

    this.state = {
      cards: [],
    };
  }

  public async generateCards() {
    const numberInput = document.querySelector<HTMLInputElement>(
      '#card-number-input'
    );

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

          return `${l}?card=${card}`;
        })
    );

    this.setState({ cards });

    document.querySelector(
      '#card-links-container'
    )!.innerHTML = this.state.cards.map((c) => `<p>${c}</p>`).join('');
  }

  public handleInputChanged() {
    const numberInput = document.querySelector<HTMLInputElement>(
      '#card-number-input'
    );
    const value = parseInt(numberInput!.value, 10);
    if (!this.validateCardNumber(value)) {
      numberInput?.classList.add('validation-error');
    } else {
      numberInput?.classList.remove('validation-error');
    }
  }

  public render() {
    return `
      <div class="generator flex-column">
        <div class="flex-row">
          <input
            id="card-number-input"
            type="number"
            placeholder="A number, e.g. 5"
            onChange="${this.callClassFunction('handleInputChanged')}"/>
          <button
            id="generate-button"
            class="button"
            onClick="${this.callClassFunction('generateCards')}">
            Generate
          </button>
        </div>
        <div id="card-links-container" class="flex-column">
          <p>Enter a number above and click generate to generate bingo card links.</p>
        </div>
      </div>
    `;
  }

  private isUniqueCard = (hash: string) =>
    !this.state.cards.map((c) => c.split('-')[0]).includes(hash);

  private validateCardNumber = (val: number) => !!val && val > 0;
}
