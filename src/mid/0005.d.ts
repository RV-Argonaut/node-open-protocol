import { MID } from "../openProtocolParser";

export interface MID0005 extends MID<{
    midNumber: number;
}, 1> {
    mid: 5;
    noAck: true;
}

export function parser (msg: EncodedMID, opts, cb: (err: Error | null, msg: MID0005) => void): void;
export function serializer (msg: MID0005, opts, cb: (err: Error | null, msg: EncodedMID) => void): void;
