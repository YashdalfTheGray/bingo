import { IDocumentWithRegistry } from '@bingo/client/Component';
import { isTargetAnIconButton } from '@bingo/client/util';
import CardDetailRow from '@bingo/components/CardDetailRow';
import Generator from '@bingo/components/Generator';

export default class EventHandler {
  constructor(private root: HTMLElement) {}

  public setup() {
    this.root.addEventListener('click', (e) => {
      if ((e.target as HTMLElement).id === 'generate-button') {
        (
          (document as IDocumentWithRegistry).componentRegistry
            .Generator4 as Generator
        ).generateCards();
      } else if (isTargetAnIconButton(e.target)) {
        const dataset = e.target.dataset;
        (
          (document as IDocumentWithRegistry).componentRegistry[
            dataset.rowId!
          ] as CardDetailRow
        ).handleCardCopy(dataset.cardLink!, dataset.cardHash!);
      }
    });

    this.root.addEventListener('change', (e) => {
      if ((e.target as HTMLElement).id === 'card-number-input') {
        (
          (document as IDocumentWithRegistry).componentRegistry
            .Generator4 as Generator
        ).handleInputChanged();
      }
    });
  }
}
