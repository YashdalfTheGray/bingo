import App from '@bingo/client/App';
import { IDocumentWithRegistry } from './Component';
import Generator from './components/Generator';
import './index.scss';

const rootApp = document.querySelector('#app-root')!;

rootApp.addEventListener('click', (e) => {
  if ((e.target as HTMLElement).id === 'generate-button') {
    (
      (document as IDocumentWithRegistry).componentRegistry
        .Generator4 as Generator
    ).generateCards();
  }
});

rootApp.addEventListener('change', (e) => {
  if ((e.target as HTMLElement).id === 'card-number-input') {
    (
      (document as IDocumentWithRegistry).componentRegistry
        .Generator4 as Generator
    ).handleInputChanged();
  }
});

rootApp.innerHTML = new App().render();

if (process.env.NODE_ENV === 'development' && module.hot) {
  module.hot.accept('./App.ts', () => {
    // tslint:disable-next-line:no-console
    console.log('New app.ts module detected');
    rootApp.innerHTML = new App().render();
  });
}
