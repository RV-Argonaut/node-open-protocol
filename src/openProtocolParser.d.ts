import { Transform, TransformOptions } from 'stream';

export interface OpenProtocolParserOpts extends TransformOptions {
    rawData?: boolean;
};

/** generic type for a MID, which has an unknown payload (payload type to be extended by other MIDs) */
export type MID = {
    mid: number;
    revision: number;
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
    payload: unknown;
    _raw?: Buffer;
}

export type EncodedMID = MID<Buffer>;

export = class OpenProtocolParser extends Transform {
    constructor(opts?: OpenProtocolParserOpts): void;
    on(event: 'data', listener: (chunk: EncodedMID) => void): void;
}
