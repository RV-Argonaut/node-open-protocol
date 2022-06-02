//@ts-check
/*
  Copyright: (c) 2018-2020, Smart-Tech Controle e Automação
  GNU General Public License v3.0+ (see LICENSE or https://www.gnu.org/licenses/gpl-3.0.txt)
*/

const helpers = require("../helpers.js");

const rev1 = /** @type {const} */ ({
    mid: 4,
    revision: 1,
    params: [
        { key: 1, type: 'num', len: 2, keyl: null, name: 'errorCode' },
        { key: 2, type: 'num', len: 4, keyl: null, name: 'midNumber' },
    ],
});

/**
 * @typedef {import('../mid').MidTypeFromStruct<rev1>} MID0004
 */

const revisions = /** @type {import("../helpers.js").DeepWriteable<[rev1]>} */ ([ rev1 ]);

/**
 * @param {import('../mid').EncodedMID} msg
 * @param {any} opts
 * @param {(err: Error | null, msg?: MID0004) => void} cb
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
 * @param {MID0004} msg 
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

module.exports = {
    parser,
    serializer,
    revision
};
