//@ts-check
/*
  Copyright: (c) 2018-2020, Smart-Tech Controle e Automação
  GNU General Public License v3.0+ (see LICENSE or https://www.gnu.org/licenses/gpl-3.0.txt)
*/

const helpers = require("../helpers.js");

const rev1 = /** @type {const} */ ({
    mid: 38,
    revision: 1,
    params: [
        { key: 1, keyl: null, type: 'num', len: 2, name: 'jobID' },
    ],
});

const rev2 = /** @type {const} */ ({
    mid: 38,
    revision: 2,
    params: [
        { key: 1, keyl: null, type: 'num', len: 4, name: 'jobID' },
    ],
});

/**
 * @template MRS
 * @typedef {import('../mid').MidTypeFromStruct<MRS>} MidTypeFromStruct<MRS>
 */

/**
 * @typedef {MidTypeFromStruct<typeof rev1>} MID0038_r1
 * @typedef {MidTypeFromStruct<typeof rev2>} MID0038_r2
 * @typedef {MID0038_r1 | MID0038_r2} MID0038
 */

const revisions = /** @type {import("../helpers.js").DeepWriteable<[rev1, rev2]>} */ ([ rev1, rev2 ]);

/**
 * @param {import('../mid').EncodedMID} msg 
 * @param {any} opts
 * @param {(err: Error | null, msg?: MID0038) => void} cb 
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
 * @param {MID0038} msg 
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
    return [2, 1];
}

let params = {
    "1": [{
        name: "jobID",
        type: "number",
        desc: "0 - 99"
    }],
    "2": [{
        name: "jobID",
        type: "number",
        desc: "0 - 9999"
    }]
};

module.exports = {
    params,
    parser,
    serializer,
    revision
};
