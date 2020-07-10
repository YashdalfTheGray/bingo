import * as jsdom from 'jsdom';

export function buildChart(data: { [key: string]: number }): string {
  const chart = new jsdom.JSDOM('<!DOCTYPE html>');

  chart.window.document.body.appendChild(
    buildParent(chart, Object.keys(data).length)
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
