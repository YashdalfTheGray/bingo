import Component from '@bingo/client/Component';

interface ICardProps {
  card: string;
}

export default class Card extends Component {
  private props: ICardProps;

  constructor(props: ICardProps) {
    super('Card');

    this.props = props;
  }

  public render() {
    const { card } = this.props;

    return `
      <div>This is where the card is going to go</div>
      <div>${card}</div>
    `;
  }
}
