//@ts-check
/*
  Copyright: (c) 2018-2020, Smart-Tech Controle e Automação
  GNU General Public License v3.0+ (see LICENSE or https://www.gnu.org/licenses/gpl-3.0.txt)
*/

const helpers = require("../helpers.js");

const rev1 = /** @type {const} */ ({
    mid: 19,
    revision: 1,
    params: [
        { key: 1, keyl: null, type: 'num', len: 3, name: 'parameterSetID' },
        { key: 2, keyl: null, type: 'num', len: 2, name: 'batchSize' },
    ],
});

/**
 * @template MRS
 * @typedef {import('../mid').MidTypeFromStruct<MRS>} MidTypeFromStruct<MRS>
 */

/**
 * @typedef {MidTypeFromStruct<typeof rev1>} MID0019
 */

const revisions = /** @type {import("../helpers.js").DeepWriteable<[rev1]>} */ ([ rev1 ]);

/**
 * @param {import('../mid').EncodedMID} msg 
 * @param {any} opts
 * @param {(err: Error | null, msg?: MID0019) => void} cb 
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
 * @param {MID0019} msg 
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
    return [1];
}

let params = {
    "1": [{
            name: "parameterSetID",
            type: "number",
            desc: "0 - 999"
        },
        {
            name: "batchSize",
            type: "number",
            desc: "0 - 99"
        }
    ]
};

module.exports = {
    params,
    parser,
    serializer,
    revision
};
