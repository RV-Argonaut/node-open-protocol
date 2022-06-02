import { MID } from "../openProtocolParser";

export interface MID9999 extends MID {
    mid: 9999;
    revision: 1;
}

export function parser (msg: EncodedMID, opts, cb: (err: Error | null, msg: MID9999) => void): void;
export function serializer (msg: MID9999, opts, cb: (err: Error | null, msg: EncodedMID) => void): void;
