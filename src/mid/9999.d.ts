import { MID } from "../openProtocolParser";

export interface MID9999 extends MID<{}, 1> {
    mid: 9999;
}

export function parser (msg: EncodedMID, opts, cb: (err: Error | null, msg: MID9999) => void): void;
export function serializer (msg: MID9999, opts, cb: (err: Error | null, msg: EncodedMID) => void): void;
