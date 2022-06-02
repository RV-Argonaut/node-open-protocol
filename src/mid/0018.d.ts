import { MID } from "../openProtocolParser";

export interface MID0018 extends MID<{
    parameterSetID: number;
}, 1> {
    mid: 18;
    noAck: false;
}

export function parser (msg: EncodedMID, opts, cb: (err: Error | null, msg: MID0018) => void): void;
export function serializer (msg: MID0018, opts, cb: (err: Error | null, msg: EncodedMID) => void): void;
