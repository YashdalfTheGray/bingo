import * as xxh from 'xxhashjs';

const encodeColumns = (cols: number[][]): string[] =>
  cols.map((c) => encodeOneColumn(c));

const encodeOneColumn = (col: number[]): string =>
  parseInt(col.map((n) => n.toString().padStart(2, '0')).join(''), 10).toString(
    16
  );

const decodeColumns = (cols: string[]): number[][] =>
  cols.map((c) => decodeOneColumn(c));

const decodeOneColumn = (col: string): number[] =>
  parseInt(col, 16)
    .toString()
    .padStart(10, '0')
    .match(/.{2}/g)!
    .map((e) => parseInt(e, 10));

const hashColumns = (cols: number[][]): string =>
  xxh
    .h32(
      cols
        .flat()
        .map((n) => n.toString().padStart(2, '0'))
        .join(''),
      cols[0][0]
    )
    .toString(16);

export {
  encodeColumns,
  encodeOneColumn,
  decodeColumns,
  decodeOneColumn,
  hashColumns,
};
