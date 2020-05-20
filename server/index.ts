import { resolve } from 'path';

import * as chalk from 'chalk';
import express, {
  NextFunction,
  Request,
  RequestHandler,
  Response,
} from 'express';

const port = process.env.PORT || process.argv[2] || 8080;
const wrap = (fn: RequestHandler) => (
  ...args: [Request, Response, NextFunction]
) => fn(...args).catch(args[2]);

const app = express();

app.use(express.static(resolve('public')));

app.listen(port, () =>
  console.log(`Server running on port ${chalk.green(port)}`)
);
