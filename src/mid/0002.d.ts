import { MID, EncodedMID } from "../openProtocolParser"

interface MID0002_r1 {
  /** @default 0 */
  cellID: number;
  /** @default 0 */
  channelID: number;
  controllerName: string;
}

interface MID0002_r2 extends MID0002_r1 {
  supplierCode: string;
}

interface MID0002_r3 extends MID0002_r2 {
  openProtocolVersion: string;
  controllerSoftwareVersion: string;
  toolSoftwareVersion: string;
}

interface MID0002_r4 extends MID0002_r3 {
  rbuType: string;
  controllerSerialNumber: string;
}

interface MID0002_r5 extends MID0002_r4 {
  systemType: number;
  systemSubtype: number;
}

interface MID0002_r6 extends MID0002_r5 {
  sequenceNumberSupport: number;
  linkingHandlingSupport: number;
  stationID: number; // TODO not sure if this is expected to be a number. also this only appears in the serializer
  stationName: string; // TODO this only appears in the serializer for some reason
  clientID: number;
}

interface MID0002_base<PAYLOAD, REV extends number> extends MID<PAYLOAD, REV> {
  mid: 2;
  noAck: false;
  payload: PAYLOAD;
}

export type MID0002 = 
  MID0002_base<MID0002_r1, 1> |
  MID0002_base<MID0002_r2, 2> |
  MID0002_base<MID0002_r3, 3> |
  MID0002_base<MID0002_r4, 4> |
  MID0002_base<MID0002_r5, 5> |
  MID0002_base<MID0002_r6, 6>;

export function parser (msg: EncodedMID, opts, cb: (err: Error | null, msg: MID0002) => void): void;
export function serializer (msg: MID0002, opts, cb: (err: Error | null, msg: EncodedMID) => void): void;
