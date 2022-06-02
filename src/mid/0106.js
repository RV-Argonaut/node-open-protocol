//@ts-check
/*
  Copyright: (c) 2018-2020, Smart-Tech Controle e Automação
  GNU General Public License v3.0+ (see LICENSE or https://www.gnu.org/licenses/gpl-3.0.txt)
*/
const helpers = require("../helpers.js");

const rev1 = /** @type {const} */ ({
    mid: 106,
    revision: 1,
    params: [
        { key: 1, type: 'num', len: 2, name: 'totalNoOfMessages' },
        { key: 2, type: 'num', len: 2, name: 'messageNumber' },
        { key: 3, type: 'num', len: 10, name: 'dataNoSystem' },
        { key: 4, type: 'num', len: 2, name: 'stationNo' },
        { key: 5, type: 'str', len: 20, name: 'stationName' },
        { key: 6, type: 'str', len: 19, name: 'time' },
        { key: 7, type: 'num', len: 2, name: 'modeNo' },
        { key: 8, type: 'str', len: 20, name: 'modeName' },
        { key: 9, type: 'num', len: 1, name: 'simpleStatus' },
        { key: 10, type: 'num', len: 1, name: 'pmStatus' },
        { key: 11, type: 'str', len: 40, name: 'wpId' },

        { key: 12, type: 'num', len: 2, name: 'numberOfBolts' },
        /** these repeat for each numberOfBolts, starting at parameter number 13 */
        {
            name: 'bolts',
            key: 13,
            repeatParam: 'numberOfBolts',
            params: [
                { key: 13, type: 'num', len: 2, name: 'ordinalBoltNumber' },
                { key: 14, type: 'num', len: 1, name: 'simpleBoltStatus' },
                { key: 15, type: 'num', len: 1, name: 'torqueStatus' },
                { key: 16, type: 'num', len: 1, name: 'angleStatus' },
                { key: 17, type: 'num', len: 7, name: 'boltT' },
                { key: 18, type: 'num', len: 7, name: 'boltA' },
                { key: 19, type: 'num', len: 7, name: 'boltTHighLimit' },
                { key: 20, type: 'num', len: 7, name: 'boltTLowLimit' },
                { key: 21, type: 'num', len: 7, name: 'boltAHighLimit' },
                { key: 22, type: 'num', len: 7, name: 'boltALowLimit' }
            ],
        },

        { key: 23, type: 'num', len: 2, name: 'numberOfSpecialValues' },
        {
            name: 'specialValues',
            key: 24,
            repeatParam: 'numberOfSpecialValues',
            params: [
                { key: 25, keyl: null, type: 'str', len: 20, name: 'variableName' },
                { key: 26, keyl: null, type: 'str', len: 2, name: 'variableType' },
                { key: 27, keyl: null, type: 'num', len: 2, name: 'variableLength' },
                { key: 28, keyl: null, type: 'str', len: 'variableLength', name: 'variableValue' }
            ],
        },
    ],
});

const rev2 = /** @type {const} */ ({ ...rev1, revision: 2 });
const rev3 = /** @type {const} */ ({ ...rev1, revision: 3 });

const revisions = /** @type {import("../helpers.js").DeepWriteable<(rev1 | rev2 | rev3)[]>} */ ([ rev1, rev2, rev3 ]);

/**
 * @template MRS
 * @typedef {import('../mid').MidTypeFromStruct<MRS>} MidTypeFromStruct<MRS>
 */

/**
 * @typedef {MidTypeFromStruct<typeof rev1>} MID0002_r1
 * @typedef {MidTypeFromStruct<typeof rev2>} MID0002_r2
 * @typedef {MidTypeFromStruct<typeof rev3>} MID0002_r3
 * @typedef {MID0002_r1 | MID0002_r2 | MID0002_r3} MID0106
 */

/**
 * @param {import('../helpers').EncodedMID} msg
 * @param {any} opts
 * @param {(err: Error | null, msg?: MID0106) => void} cb
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
 * @param {MID0106} msg 
 * @param {any} opts 
 * @param {(err: Error | null, msg?: import('../helpers').EncodedMID) => void} cb
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
    return [1, 2, 3];
}

module.exports = {
    parser,
    serializer,
    revision
};
