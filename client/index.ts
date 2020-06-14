import App from '@bingo/client/App';
import './index.scss';

document.querySelector('#app-root')!.innerHTML = new App().render();

if (process.env.NODE_ENV === 'development' && module.hot) {
  module.hot.accept('./App.ts', () => {
    // tslint:disable-next-line:no-console
    console.log('New app.ts module detected');
    document.querySelector('#app-root')!.innerHTML = new App().render();
  });
}
