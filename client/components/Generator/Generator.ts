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

  public render() {
    return `
      <div class="generator flex-column">
        <div class="flex-row">
          <input id="card-number-input" type="number" placeholder="A number, e.g. 5"/>
          <button
            id="generate-button"
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
}
