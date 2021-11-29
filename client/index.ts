import App from '@bingo/client/App';
import EventHandler from '@bingo/components/EventHandler';

import './index.scss';

const rootApp = document.querySelector<HTMLDivElement>('#app-root')!;
const eventHandler = new EventHandler(rootApp);
eventHandler.setup();

rootApp.innerHTML = new App().render();

if (process.env.NODE_ENV === 'development' && module.hot) {
  module.hot.accept('./App.ts', () => {
    // tslint:disable-next-line:no-console
    console.log('New app.ts module detected');
    rootApp.innerHTML = new App().render();
  });
}
