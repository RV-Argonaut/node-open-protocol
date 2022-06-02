import { MID } from "../openProtocolParser";

export interface MID0050 extends MID<{
    numberVIN: string;
}, 1> {
    mid: 50;
    noAck: false;
}

export function parser (msg: EncodedMID, opts, cb: (err: Error | null, msg: MID0050) => void): void;
export function serializer (msg: MID0050, opts, cb: (err: Error | null, msg: EncodedMID) => void): void;
