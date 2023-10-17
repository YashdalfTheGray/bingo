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
import helmet from 'helmet';
import responseTime from 'response-time';

import bingoRouter from './middleware/bingo';
import hotModuleReloadingSetup from './utils/hmr';

const port = process.env.PORT || process.argv[2] || 8080;
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const wrap =
  (fn: RequestHandler) =>
  (...args: [Request, Response, NextFunction]) =>
    Promise.resolve(fn(...args)).catch(args[2]);

const app = express();

if (process.env.NODE_ENV === 'development') {
  hotModuleReloadingSetup(app);
}

const apiRouter = express.Router();

app.use(
  helmet({
    contentSecurityPolicy: {
      useDefaults: false,
      directives: {
        'default-src': ["'self'"],
        'base-uri': ["'self'"],
        'block-all-mixed-content': [],
        'font-src': ["'self'", 'https:', 'data:'],
        'frame-ancestors': ["'self'"],
        'img-src': ["'self'", 'data:'],
        'object-src': ["'none'"],
        'script-src': ["'self'"],
        'script-src-attr': ["'none'"],
        'style-src': ["'self'", 'https:', "'unsafe-inline'"],
      },
    },
  }),
);
app.use(bodyParser.json());
app.use(morgan('common'));
app.use(express.static(resolve('public')));

if (process.env.NODE_ENV === 'development') {
  app.use(responseTime());
}

apiRouter.use('/bingo', bingoRouter);
apiRouter.get('/', (_, res) => {
  res.json({
    status: 'okay',
  });
});

app.use('/api', apiRouter);

app.listen(port, () =>
  console.log(`Server running on port ${chalk.green(port)}`),
);
