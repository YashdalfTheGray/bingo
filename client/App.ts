import Component from './Component';

export default class App extends Component {
  constructor() {
    super('App');
  }

  public render() {
    return `
      <div class="flex-column">
        <div>This</div>
        <div>is</div>
        <div>a</div>
        <div>test</div>
        <div>layout</div>
      </div>
    `;
  }
}
