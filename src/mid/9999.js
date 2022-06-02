//@ts-check
/*
  Copyright: (c) 2018-2020, Smart-Tech Controle e Automação
  GNU General Public License v3.0+ (see LICENSE or https://www.gnu.org/licenses/gpl-3.0.txt)
*/

const rev1 = /** @type {const} */ ({
    mid: 9999,
    revision: 1,
    params: [],
});

/**
 * @typedef {import('../mid').MidTypeFromStruct<typeof rev1>} MID9999
 */

/**
 * @param {import('../mid').EncodedMID} msg
 * @param {any} opts
 * @param {(err: Error | null, msg?: MID9999) => void} cb
 */
function parser(msg, opts, cb) {
    let buffer = msg.payload;
    cb(null, /** @type {MID9999} */ ({ ...msg, payload: buffer.toString("ascii") }));
}

/**
 * @param {MID9999} msg 
 * @param {any} opts
 * @param {(err: Error | null, msg?: import('../mid').EncodedMID) => void} cb
 */
function serializer(msg, opts, cb) {
    cb(null, { ...msg, payload: Buffer.from('')});
}

function revision() {
    return [1];
}

module.exports = {
    parser,
    serializer,
    revision
};
