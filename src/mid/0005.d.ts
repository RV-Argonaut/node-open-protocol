import { MID } from "../openProtocolParser";

export interface MID0005 extends MID {
    mid: 5;
    revision: 1;
    noAck: true;
    payload: {
        midNumber: number;
    }
}

export function parser (msg: EncodedMID, opts, cb: (err: Error | null, msg: MID0005) => void): void;
export function serializer (msg: MID0005, opts, cb: (err: Error | null, msg: EncodedMID) => void): void;
