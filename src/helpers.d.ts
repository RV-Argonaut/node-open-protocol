import { EncodedMID } from "./openProtocolParser";

export function getMids (): Record<number, {
    parser (msg: EncodedMID, opts: unknown, cb: () => void)
}>;

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

export type EncodedMID = MID<Buffer>;

export type MidStructField = {
    name: string;
    type: 'num' | 'str' | 'rawStr';
    /**
     * field data length, or name of the (already parsed) field that indicates the field data length
     * if null, then it spans to the remainder of the payload or is calculated after parsing
     */
    len: number | string | null;
    /**
     * field key length, or null if there is no key
     * @default 2
     */
    keyl?: number | null;
    /** indicates where this field should be located and helps with identification, or `null` if this field is calculated after parsing */
    key: number | null;
};

/** a field that contains a nested struct, repeated multiple times */
type MidStructRepeatedField = {
    name: string;
    /** indicates where the field starts among sibling fields */
    key: number;
    /** the name of the (already parsed) field that says how many times this field repeats */
    repeatField: string;
    fields: MidStructField[];
};

export type MidStructBase = {
    mid: number;
    revision: number;
    fields: Record<string, MidStructField>;
};

/** converts a struct type into a parsed mid payload type */
type MidTypeFromStruct<MRS> = MRS extends {
    mid: number;
    revision: number;
    fields: Array;
} ? (MID & {
    mid: MRS['mid'];
    revision: MRS['revision'];
    payload: {
        -readonly [ field in MRS['fields'][number]['name']]: MidFieldTypeFromStruct<Extract<MRS['fields'][number], { name: field }>>;
    }
}) : never

/** converts a struct field to a parsed mid field */
type MidFieldTypeFromStruct<MSF extends MidStructField | MidStructRepeatedField> =
	MSF extends MidStructField ?
        MSF['type'] extends 'num' ? number
        : MSF['type'] extends 'str' | 'rawStr' ? string
        : MSF['type'] // get type directly
	: MSF extends MidStructRepeatedField ? {
		-readonly [ repeatedField in keyof MSF['fields'] ]: MidFieldTypeFromStruct<MSF['fields'][repeatedField]>;
	}[] : never;
