import { Transform, TransformOptions } from 'stream';

export interface OpenProtocolParserOpts extends TransformOptions {
    rawData?: boolean;
};

export type MID<PAYLOAD, REV extends number = number> = {
    mid: number;
    revision: REV;
    noAck: boolean;
    /** @default 1 */
    stationID: number;
    /** @default 1 */
    spindleID: number;
    /** @default 0 */
    sequenceNumber: number;
    /** @default 0 */
    messageParts: number;
    /** @default 0 */
    messageNumber: number;
    payload: PAYLOAD;
    _raw?: Buffer;
}

export type EncodedMID = MID<Buffer>;

export = class OpenProtocolParser extends Transform {
    constructor(opts?: OpenProtocolParserOpts): void;
    on(event: 'data', listener: (chunk: EncodedMID) => void): void;
}
