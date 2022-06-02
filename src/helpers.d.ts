import { OpenProtocolParserChunk } from "./openProtocolParser";

// export function getMids (): {
//     [ mid in ]
// };
export function getMids (): Record<number, {
    parser (msg: OpenProtocolParserChunk, opts: unknown, cb: () => void)
}>;

