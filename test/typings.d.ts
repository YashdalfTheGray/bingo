declare module 'puppeteer-to-istanbul' {
  import { CoverageEntry } from 'puppeteer';

  interface WriteOptions {
    storagePath: string;
    includeHostname: boolean;
    [key: string]: any;
  }

  interface PTI {
    write: (data: CoverageEntry[], options: WriteOptions) => void;
  }

  const pti: PTI;

  export = pti;
}
