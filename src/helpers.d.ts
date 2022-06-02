import { EncodedMID } from "./openProtocolParser";

export function getMids (): Record<number, {
    parser (msg: EncodedMID, opts: unknown, cb: () => void)
}>;

