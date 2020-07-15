import * as fs from 'fs';
import { promisify } from 'util';

import * as jsdom from 'jsdom';

export async function writeChartFile(filename: string, chart: jsdom.JSDOM) {
  const writeFileAsync = promisify(fs.writeFile);
  return writeFileAsync(filename, chart.serialize(), 'utf-8');
}

export function buildChart(data: number[]): jsdom.JSDOM {
  const chart = new jsdom.JSDOM('<!DOCTYPE html>');

  chart.window.document.body.appendChild(
    buildChartParent(chart, Object.keys(data).length)
  );

  const max = data.reduce((acc, v) => (acc < v ? v : acc));
  data.forEach((val, index) =>
    chart.window.document
      .querySelector('#chart-parent')!
      .appendChild(buildColumnWithLabel(chart, index, val, max))
  );

  chart.window.document.body.appendChild(buildRawDataSection(chart, data));

  return chart;
}

function buildChartParent(dom: jsdom.JSDOM, datapoints: number): HTMLElement {
  const parentStyles = [
    'display: grid;',
    `grid-template-columns: repeat(${datapoints}, auto);`,
    'justify-content: start;',
    `width: ${60 * datapoints}px;`,
  ].join(' ');

  const parent = dom.window.document.createElement('div');
  parent.id = 'chart-parent';
  parent.style.cssText = parentStyles;

  return parent;
}

function buildColumnWithLabel(
  dom: jsdom.JSDOM,
  label: number,
  value: number,
  max: number
): HTMLElement {
  const column = buildColumn(dom, value, max);

  const columnWithLabel = dom.window.document.createElement('div');
  columnWithLabel.style.cssText = [
    'display: flex;',
    'flex-direction: column;',
    'align-items: center;',
    'justify-content: flex-start',
  ].join(' ');

  const labelElement = dom.window.document.createElement('div');
  labelElement.innerHTML = label.toString();

  columnWithLabel.appendChild(column);
  columnWithLabel.appendChild(labelElement);
  return columnWithLabel;
}

function buildColumn(
  dom: jsdom.JSDOM,
  value: number,
  max: number
): HTMLElement {
  const outerStyles = [
    'height: 200px;',
    'width: 50px;',
    'padding: 0px 5px;',
    'position: relative;',
    'border-bottom: solid 1px rgba(0,0,0,0.5);',
  ].join(' ');

  const innerStyles = [
    'width: 50px;',
    'background-color: #1E88E5;',
    `height: ${Math.round((value / max) * 100)}%;`,
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

function buildRawDataSection(dom: jsdom.JSDOM, data: number[]) {
  const rawDataElement = dom.window.document.createElement('pre');
  rawDataElement.innerHTML = JSON.stringify(
    data.reduce(
      (acc, v, i) => ({
        ...acc,
        [i]: v,
      }),
      {}
    ),
    null,
    2
  );

  return rawDataElement;
}
