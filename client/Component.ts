import merge from 'lodash.merge';

interface IDocumentWithRegistry extends Document {
  componentRegistry: object;
  nextId: number;
}

(document as IDocumentWithRegistry).componentRegistry = {};
(document as IDocumentWithRegistry).nextId = 0;

export default class Component<P = {}, S = {}> {
  protected readonly id: string;
  protected readonly props: P;
  protected state: S;

  constructor(type: string = 'Component', props?: P) {
    this.id = `${type}${++(document as IDocumentWithRegistry).nextId}`;
    (document as IDocumentWithRegistry).componentRegistry[this.id] = this;

    if (props) {
      this.props = props;
    }
  }

  public render(): string {
    return '';
  }

  protected setState(newState: Partial<S>) {
    this.state = merge({}, this.state, newState);
  }

  protected callClassFunction(
    name: string,
    ...args: (string | number | boolean)[]
  ) {
    const argsString = args
      .map((a) => {
        if (typeof a === 'string') {
          return `'${a}'`;
        } else {
          return a.toString();
        }
      })
      .join(', ');

    return `document.componentRegistry['${this.id}'].${name}(${argsString})`;
  }
}
