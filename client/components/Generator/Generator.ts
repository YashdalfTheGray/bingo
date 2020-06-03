import Component from '@bingo/client/Component';

export default class Generator extends Component {
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
