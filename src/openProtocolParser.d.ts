import { Transform, TransformOptions } from 'stream';

export interface OpenProtocolParserOpts extends TransformOptions {
    rawData?: boolean;
};

export type MID<PAYLOAD> = {
    mid: number;
    revision: number;
    noAck: number;
    stationID: number;
    spindleID: number;
    sequenceNumber: number;
    messageParts: number;
    messageNumber: number;
    payload: Buffer;
    _raw?: Buffer;
}

export type OpenProtocolParserChunk = MID<Buffer>;

export = class OpenProtocolParser extends Transform {
    constructor(opts?: OpenProtocolParserOpts): void;
    on(event: 'data', listener: (chunk: OpenProtocolParserChunk) => void): void;
}
