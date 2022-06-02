//@ts-check
/*
  Copyright: (c) 2018-2020, Smart-Tech Controle e Automação
  GNU General Public License v3.0+ (see LICENSE or https://www.gnu.org/licenses/gpl-3.0.txt)
*/

const helpers = require("../helpers.js");

const rev1 = /** @type {const} */ ({
    mid: 18,
    revision: 1,
    params: [
        { key: 1, type: "num", len: 3, keyl: null, name: 'parameterSetID' },
    ],
});

/**
 * @typedef {import('../mid').MidTypeFromStruct<typeof rev1>} MID0018
 */

const revisions = /** @type {import("../helpers.js").DeepWriteable<[rev1]>} */ ([ rev1 ]);

/**
 * @param {import('../mid').EncodedMID} msg
 * @param {any} opts
 * @param {(err: Error | null, msg?: MID0018) => void} cb
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
 * @param {MID0018} msg 
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
    }]
};

module.exports = {
    params,
    parser,
    serializer,
    revision
};
