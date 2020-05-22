import { Router } from 'express';

import { generateSingleColumn } from '../utils/generator';

const bingoRouter = Router();

bingoRouter.get('/one', (_, res) => {
  res.json(generateSingleColumn(1, 15));
});

export default bingoRouter;
