import { MID } from "../openProtocolParser";
import constants from '../constants.json';

export interface MID0004 extends MID {
    mid: 4;
    revision: 1;
    noAck: true;
    payload: {
        midNumber: number;
        errorCode: number;
    }
}

export function parser (msg: EncodedMID, opts, cb: (err: Error | null, msg: MID0004) => void): void;
export function serializer (msg: MID0004, opts, cb: (err: Error | null, msg: EncodedMID) => void): void;
