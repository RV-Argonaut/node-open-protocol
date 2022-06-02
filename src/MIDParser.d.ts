import { TransformOptions, Transform } from 'stream';

export = class MIDParser extends Transform {
  constructor(opts?: TransformOptions);
  on(event: 'data', listener: (chunk: any) => void): void;
}
