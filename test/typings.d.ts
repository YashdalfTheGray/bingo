declare module 'puppeteer-to-istanbul' {
  import { Coverage } from 'puppeteer';

  interface WriteOptions {
    storagePath: string;
    includeHostname: boolean;
    [key: string]: any;
  }

  interface PTI {
    write: (data: Coverage, options: WriteOptions) => void;
  }

  export = PTI;
}
