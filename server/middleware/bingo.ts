import { Router } from 'express';

import { encodeColumns, hashColumns } from '../../common/cardUtils';

import { generateSingleColumn } from '../utils/generator';

enum ColumnName {
  B = 1,
  I,
  N,
  G,
  O,
}

const generateFirstColumn = (): number[] => generateSingleColumn(1, 15);
const generateSecondColumn = (): number[] => generateSingleColumn(16, 30);
const generateThirdColumn = (): number[] =>
  generateSingleColumn(31, 45).map((v, i) => (i === 2 ? 0 : v));
const generateFourthColumn = (): number[] => generateSingleColumn(46, 60);
const generateFifthColumn = (): number[] => generateSingleColumn(61, 75);

const bingoRouter = Router();

bingoRouter.get('/one', (_, res) => {
  const columns = [
    generateFirstColumn(),
    generateSecondColumn(),
    generateThirdColumn(),
    generateFourthColumn(),
    generateFifthColumn(),
  ];

  res.json({
    card: [hashColumns(columns), ...encodeColumns(columns)].join('-'),
  });
});

export default bingoRouter;
