import { MID, OpenProtocolParserChunk } from "../openProtocolParser"

type MID0002_r6 = {
  cellID: number;
  channelID: number;
  controllerName: string;
  supplierCode: string;
  openProtocolVersion: string;
  controllerSoftwareVersion: string;
  toolSoftwareVersion: string;
  rbuType: string;
  controllerSerialNumber: string;
  systemType: number;
  systemSubtype: number;
  sequenceNumberSupport: number;
  linkingHandlingSupport: number;
}

type MID0002_r5 = {
  cellID: number;
  channelID: number;
  controllerName: string;
  supplierCode: string;
  openProtocolVersion: string;
  controllerSoftwareVersion: string;
  toolSoftwareVersion: string;
  rbuType: string;
  controllerSerialNumber: string;
  systemType: number;
  systemSubtype: number;
}

type MID0002_r4 = {
  cellID: number;
  channelID: number;
  controllerName: string;
  supplierCode: string;
  openProtocolVersion: string;
  controllerSoftwareVersion: string;
  toolSoftwareVersion: string;
  rbuType: string;
  controllerSerialNumber: string;
}

type MID0002_r3 = {
  cellID: number;
  channelID: number;
  controllerName: string;
  supplierCode: string;
  openProtocolVersion: string;
  controllerSoftwareVersion: string;
  toolSoftwareVersion: string;
}

type MID0002_r2 = {
  cellID: number;
  channelID: number;
  controllerName: string;
  supplierCode: string;
}

type MID0002_r1 = {
  cellID: number;
  channelID: number;
  controllerName: string;
}

export type MID0002_PayloadMap = {
  6: MID0002_r6,
  5: MID0002_r5,
  4: MID0002_r4,
  3: MID0002_r3,
  2: MID0002_r2,
  1: MID0002_r1,
}

export type MID0002 =
    MID<MID0002_r6>
  | MID<MID0002_r5>
  | MID<MID0002_r4>
  | MID<MID0002_r3>
  | MID<MID0002_r2>
  | MID<MID0002_r1>;

export function parser (msg: OpenProtocolParserChunk, opts, cb: (err: Error | null, msg: MID0002) => void): void;
export function serializer (msg: MID0002, opts, cb: (err: Error | null, msg: OpenProtocolParserChunk) => void): void;
