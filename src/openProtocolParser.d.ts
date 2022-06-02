import { Transform, TransformOptions } from 'stream';

export interface OpenProtocolParserOpts extends TransformOptions {
    rawData?: boolean;
};

export = class OpenProtocolParser extends Transform {
    constructor(opts?: OpenProtocolParserOpts): void;
    on(event: 'data', listener: (chunk: EncodedMID) => void): void;
}
