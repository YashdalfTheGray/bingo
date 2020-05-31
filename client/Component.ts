interface IDocumentWithRegistry extends Document {
  componentRegistry: object;
  nextId: number;
}

(document as IDocumentWithRegistry).componentRegistry = {};
(document as IDocumentWithRegistry).nextId = 0;

export default class Component {
  protected id: string;

  constructor(type: string = 'Component') {
    this.id = `${type}${++(document as IDocumentWithRegistry).nextId}`;
    (document as IDocumentWithRegistry).componentRegistry[this.id] = this;
  }

  public render(props?: object): string {
    return '';
  }
}
