import { Transform, TransformOptions } from 'stream';
import { EncodedMID } from './openProtocolParser';

export = class OpenProtocalSerializer extends Transform {
    constructor(opts?: TransformOptions): void;
    write(chunk: EncodedMID, cb?: (err?: Error) => void): void;
    write(chunk: EncodedMID, encoding?: BufferEncoding, cb?: (err?: Error) => void): void;
}
