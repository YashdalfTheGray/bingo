import { resolve } from 'path';

import express from 'express';
import * as chalk from 'chalk';

const port = process.env.PORT || process.argv[2] || 8080;

const app = express();

app.use(express.static(resolve('public')));

app.listen(port, () =>
  console.log(`Server running on port ${chalk.green(port)}`)
);
