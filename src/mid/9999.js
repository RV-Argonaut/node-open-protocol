//@ts-check
/*
  Copyright: (c) 2018-2020, Smart-Tech Controle e Automação
  GNU General Public License v3.0+ (see LICENSE or https://www.gnu.org/licenses/gpl-3.0.txt)
*/

const rev1 = /** @type {const} */ ({
    mid: 9999,
    revision: 1,
    fields: [],
});

/**
 * @typedef {import("../helpers").MidTypeFromStruct<rev1>} MID9999
 */

/**
 * @param {import('../helpers').EncodedMID} msg
 * @param {any} opts
 * @param {(err: Error | null, msg?: MID9999) => void} cb
 */
function parser(msg, opts, cb) {
    let buffer = msg.payload;
    msg.payload = buffer.toString("ascii");
    cb(null, msg);
}

/**
 * @param {MID9999} msg 
 * @param {any} opts
 * @param {(err: Error | null, msg?: import('../helpers').EncodedMID) => void} cb
 */
function serializer(msg, opts, cb) {
    let buf = Buffer.from("");
    msg.payload = buf;
    cb(null, msg);
}

function revision() {
    return [1];
}

module.exports = {
    parser,
    serializer,
    revision
};
