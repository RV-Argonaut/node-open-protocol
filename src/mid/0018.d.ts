import { MID } from "../openProtocolParser";

export interface MID0018 extends MID {
    mid: 18;
    revision: 1;
    noAck: false;
    payload: {
        parameterSetID: number;
    };
}

export function parser (msg: EncodedMID, opts, cb: (err: Error | null, msg: MID0018) => void): void;
export function serializer (msg: MID0018, opts, cb: (err: Error | null, msg: EncodedMID) => void): void;
