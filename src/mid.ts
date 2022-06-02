import { DeepWriteable } from "./helpers";

/** generic type for a MID, which has an unknown payload (payload type to be extended by other MIDs) */
export type MID = {
    mid: number;
    revision: number;
    noAck: boolean;
    /** @default 1 */
    stationID: number;
    /** @default 1 */
    spindleID: number;
    /** @default 0 */
    sequenceNumber: number;
    /** @default 0 */
    messageParts: number;
    /** @default 0 */
    messageNumber: number;
    payload: unknown;
    _raw?: Buffer;
}

export interface EncodedMID extends MID {
    payload: Buffer;
};

export type MidStructParam = {
    name: string;
    type: any;
    /**
     * param data length, or name of the (already parsed) param that indicates the param data length
     * if null, then it spans to the remainder of the payload or is calculated after parsing.
     */
    len: number | string | null;
    /**
     * param key length, or null if there is no key
     * @default 2
     */
    keyl?: number | null;
    /** indicates where this param should be located and helps with identification, or `null` if this param is calculated after parsing. */
    key: number | null;
};

/** a param that contains a nested struct, repeated multiple times */
export type MidStructRepeatedParam = {
    name: string;
    /** indicates where the param starts among sibling params. */
    key: number;
    /** the name of the (already parsed) param that says how many times this param repeats */
    repeatParam: string;
    params: MidStructParam[];
};

export type MidStructBase = {
    mid: number;
    revision: number;
    params: (MidStructParam | MidStructRepeatedParam)[];
};

/** converts a struct type into a parsed mid payload type */
export type MidTypeFromStruct<MRS> = MRS extends {
    mid: number;
    revision: number;
    params: any;
} ? (MID & {
    mid: MRS['mid'];
    revision: MRS['revision'];
    payload: {
        -readonly [ param in MRS['params'][number]['name']]: MidParamTypeFromStruct<Extract<MRS['params'][number], { name: param }>>;
    }
}) : never

/** converts a struct param to a parsed mid param */
type MidParamTypeFromStruct<MSF extends MidStructParam | MidStructRepeatedParam> =
	MSF extends { type: any } ?
        MSF['type'] extends 'num' ? number
        : MSF['type'] extends 'str' | 'rawStr' ? string
        : MSF['type'] extends (readonly any[]) ? MSF['type'][number][]
        : MSF['type'] // get type directly
    : DeepWriteable<MSF> extends MidStructRepeatedParam ? {
        [ repeatedParam in DeepWriteable<MSF>['params'][number]['name'] ]: MidParamTypeFromStruct<Extract<DeepWriteable<MSF>['params'][number], repeatedParam>>;
    }[] : never;
