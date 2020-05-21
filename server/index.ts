import { resolve } from 'path';

import bodyParser from 'body-parser';
import chalk from 'chalk';
import express, {
  NextFunction,
  Request,
  RequestHandler,
  Response,
} from 'express';
import morgan from 'morgan';

const port = process.env.PORT || process.argv[2] || 8080;
const wrap = (fn: RequestHandler) => (
  ...args: [Request, Response, NextFunction]
) => fn(...args).catch(args[2]);

const app = express();

const apiRouter = express.Router();

app.use(bodyParser.json());
app.use(morgan('dev'));
app.use(express.static(resolve('public')));

apiRouter.get('/', (req, res) => {
  res.json({
    status: 'okay',
  });
});

app.use('/api', apiRouter);

app.listen(port, () =>
  console.log(`Server running on port ${chalk.green(port)}`)
);
