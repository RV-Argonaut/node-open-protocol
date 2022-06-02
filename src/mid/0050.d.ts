import { MID } from "../openProtocolParser";

export interface MID0050 extends MID {
    mid: 50;
    revision: 1;
    noAck: false;
    payload: {
        numberVIN: string;
    };
}

export function parser (msg: EncodedMID, opts, cb: (err: Error | null, msg: MID0050) => void): void;
export function serializer (msg: MID0050, opts, cb: (err: Error | null, msg: EncodedMID) => void): void;
