import Component from '@bingo/client/Component';

import './generator.scss';

interface IGeneratorState {
  cards: string[];
}

export default class Generator extends Component<{}, IGeneratorState> {
  constructor() {
    super('Generator');
  }

  public render() {
    return `
      <div class="generator">
        <input type="number" />
        <button>Generate</button>
      </div>
    `;
  }
}
