import * as jsdom from 'jsdom';

export function buildChart(data: number[]): string {
  const chart = new jsdom.JSDOM('<!DOCTYPE html>');

  chart.window.document.body.appendChild(
    buildParent(chart, Object.keys(data).length)
  );

  const max = data.reduce((acc, v) => (acc > v ? v : acc));
  data.forEach((val) =>
    chart.window.document
      .querySelector('#chart-parent')
      ?.appendChild(buildColumn(chart, val, max))
  );

  return chart.serialize();
}

function buildParent(dom: jsdom.JSDOM, datapoints: number): HTMLElement {
  const parentStyles = [
    'display: grid;',
    `grid-template-columns: repeat(${datapoints}, auto);`,
    'justify-content: start;',
    'grid-column-gap: 10px;',
    'border-left: solid 1px rgba(0,0,0,0.5);',
    'border-bottom: solid 1px rgba(0,0,0,0.5);',
    'padding-left: 10px;',
    `width: ${60 * datapoints}px;`,
  ].join(' ');

  const parent = dom.window.document.createElement('div');
  parent.id = 'chart-parent';
  parent.style.cssText = parentStyles;

  return parent;
}

function buildColumn(
  dom: jsdom.JSDOM,
  value: number,
  max: number
): HTMLElement {
  const outerStyles = [
    'height: 200px;',
    'width: 50px;',
    'position: relative;',
  ].join(' ');

  const innerStyles = [
    'width: 100%;',
    'background-color: #1E88E5;',
    `height: ${Math.round(value / max) * 100}%;`,
    'position: absolute;',
    'bottom: 0;',
  ].join(' ');

  const outer = dom.window.document.createElement('div');
  outer.style.cssText = outerStyles;

  const inner = dom.window.document.createElement('div');
  inner.style.cssText = innerStyles;

  outer.appendChild(inner);

  return outer;
}
