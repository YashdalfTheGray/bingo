import Component from '@bingo/client/Component';

export default class Content extends Component {
  constructor() {
    super('Content');
  }

  public render() {
    return `
      <div class="content flex-column flex-item-dynamic">
        <div>this</div>
        <div>is</div>
        <div>a</div>
        <div>test</div>
      <div>
    `;
  }
}
