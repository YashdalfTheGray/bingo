import * as jsdom from 'jsdom';

export function buildChart(data: { [key: string]: number }): string {
  const chart = new jsdom.JSDOM('<!DOCTYPE html>');

  return chart.serialize();
}
