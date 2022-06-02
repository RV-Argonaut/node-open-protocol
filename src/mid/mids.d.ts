import { MID } from "../openProtocolParser";
import { MID0001 } from "./0001";
import { MID0002 } from "./0002";
import { MID0005 } from "./0005";
import { MID0018 } from "./0018";
import { MID0050 } from "./0050";
import { MID9999 } from "./9999";

export type MidMap = {
    1: MID0001;
    2: MID0002;
    5: MID0005;
    18: MID0018;
    50: MID0050;
    9999: MID9999;
};
