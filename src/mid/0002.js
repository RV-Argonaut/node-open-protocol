//@ts-check
/*
  Copyright: (c) 2018-2020, Smart-Tech Controle e Automação
  GNU General Public License v3.0+ (see LICENSE or https://www.gnu.org/licenses/gpl-3.0.txt)
*/

const helpers = require("../helpers.js");

const rev1 = /** @type {const} */ ({
    mid: 2,
    revision: 1,
    params: [
        { key: 1, type: 'num', len: 4, name: 'cellID' },
        { key: 2, type: 'num', len: 2, name: 'channelID' },
        { key: 3, type: 'str', len: 25, name: 'controllerName' },
    ],
});

const rev2 = /** @type {const} */ ({
    mid: 2,
    revision: 2,
    params: [
        ...rev1.params,
        { key: 4, type: 'str', len: 3, name: 'supplierCode' },
    ],
});

const rev3 = /** @type {const} */ ({
    mid: 2,
    revision: 3,
    params: [
        ...rev2.params,
        { key: 5, type: 'str', len: 19, name: 'openProtocolVersion' },
        { key: 6, type: 'str', len: 19, name: 'controllerSoftwareVersion' },
        { key: 7, type: 'str', len: 19, name: 'toolSoftwareVersion' }
    ],
});

const rev4 = /** @type {const} */ ({
    mid: 2,
    revision: 4,
    params: [
        ...rev3.params,
        { key: 8, type: 'str', len: 24, name: 'rbuType' },
        { key: 9, type: 'str', len: 10, name: 'controllerSerialNumber' }
    ],
});

const rev5 = /** @type {const} */ ({
    mid: 2,
    revision: 5,
    params: [
        ...rev4.params,
        // POWER_FOCUS_4000: 1, POWER_MAC_4000: 2, POWER_FOCUS_6000: 3
        { key: 10, type: 'num', len: 3, name: 'systemType' },
        { key: 11, type: 'num', len: 3, name: 'systemSubtype' }
    ],
});

const rev6 = /** @type {const} */ ({
    mid: 2,
    revision: 6,
    params: [
        ...rev5.params,
        { key: 12, type: "num", len: 1, name: 'sequenceNumberSupport' },
        { key: 13, type: "num", len: 1, name: 'linkingHandlingSupport' },
        { key: 14, type: "num", len: 10, name: 'stationID' },
        { key: 15, type: "str", len: 25, name: 'stationName' },
        { key: 16, type: "num", len: 1, name: 'clientID' },
    ],
});

/**
 * @template MRS
 * @typedef {import('../mid').MidTypeFromStruct<MRS>} MidTypeFromStruct<MRS>
 */

/**
 * @typedef {MidTypeFromStruct<typeof rev1>} MID0002_r1
 * @typedef {MidTypeFromStruct<typeof rev2>} MID0002_r2
 * @typedef {MidTypeFromStruct<typeof rev3>} MID0002_r3
 * @typedef {MidTypeFromStruct<typeof rev4>} MID0002_r4
 * @typedef {MidTypeFromStruct<typeof rev5>} MID0002_r5
 * @typedef {MidTypeFromStruct<typeof rev6>} MID0002_r6
 * @typedef {MID0002_r1 | MID0002_r2 | MID0002_r3 | MID0002_r4 | MID0002_r5 | MID0002_r6} MID0002
 */

const revisions = /** @type {import("../helpers.js").DeepWriteable<[rev1, rev2, rev3, rev4, rev5, rev6]>} */ ([ rev1, rev2, rev3, rev4, rev5, rev6 ]);

/**
 * @param {import('../mid').EncodedMID} msg 
 * @param {any} opts
 * @param {(err: Error | null, msg?: MID0002) => void} cb 
 */
function parser(msg, opts, cb) {
    let result, err = null;
    try {
        result = helpers.parse(msg, revisions);
    } catch (_err) {
        err = _err;
    }
    cb(err, result);
}

/**
 * @param {MID0002} msg 
 * @param {any} opts 
 * @param {(err: Error | null, msg?: import('../mid').EncodedMID) => void} cb
 */
function serializer(msg, opts, cb) {
    let result, err = null;
    try {
        result = { ...msg, payload: helpers.serialize(msg, revisions) };
    } catch (_err) {
        err = _err;
    }
    cb(err, result);
}

function revision() {
    return [6, 5, 4, 3, 2, 1];
}

module.exports = {
    parser,
    serializer,
    revision
};
