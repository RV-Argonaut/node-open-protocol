//@ts-check
/*
  Copyright: (c) 2018-2020, Smart-Tech Controle e Automação
  GNU General Public License v3.0+ (see LICENSE or https://www.gnu.org/licenses/gpl-3.0.txt)
*/
const helpers = require("../helpers.js");

const rev1 = /** @type {const} */ ({
    mid: 35,
    revision: 1,
    params: [
        { key: 1, type: 'num', len: 2, name: 'jobID' },
        { key: 2, type: 'num', len: 1, name: 'jobStatus' },
        { key: 3, type: 'num', len: 1, name: 'jobBatchMode' },
        { key: 4, type: 'num', len: 4, name: 'jobBatchSize' },
        { key: 5, type: 'num', len: 4, name: 'jobBatchCounter' },
        { key: 6, type: 'str', len: 19, name: 'timeStamp' }
    ],
});

const rev2 = /** @type {const} */ ({
    mid: 35,
    revision: 2,
    params: [
        { key: 1, type: 'num', len: 4, name: 'jobID' },
        { key: 2, type: 'num', len: 1, name: 'jobStatus' },
        { key: 3, type: 'num', len: 1, name: 'jobBatchMode' },
        { key: 4, type: 'num', len: 4, name: 'jobBatchSize' },
        { key: 5, type: 'num', len: 4, name: 'jobBatchCounter' },
        { key: 6, type: 'str', len: 19, name: 'timeStamp' }
    ],
});

const rev3 = /** @type {const} */ ({
    mid: 35,
    revision: 3,
    params: [
        ...rev2.params,
        { key: 7, type: 'num', len: 3, name: 'jobCurrentStep' },
        { key: 8, type: 'num', len: 3, name: 'jobTotalSteps' },
        { key: 9, type: 'num', len: 2, name: 'jobStepType' },
    ],
});

const rev4 = /** @type {const} */ ({
    mid: 35,
    revision: 4,
    params: [
        ...rev3.params,
        { key: 10, type: 'num', len: 2, name: 'jobTighteningStatus' },
    ],
});

const rev5 = /** @type {const} */ ({
    mid: 35,
    revision: 5,
    params: [
        ...rev4.params,
        { key: 11, type: 'num', len: 5, name: 'jobSequenceNumber' },
        { key: 12, type: 'str', len: 25, name: 'numberVIN' },
        { key: 13, type: 'str', len: 25, name: 'identifierPart2' },
        { key: 14, type: 'str', len: 25, name: 'identifierPart3' },
        { key: 15, type: 'str', len: 25, name: 'identifierPart4' }
    ],
});

/**
 * @template MRS
 * @typedef {import('../mid').MidTypeFromStruct<MRS>} MidTypeFromStruct<MRS>
 */

/**
 * @typedef {MidTypeFromStruct<typeof rev1>} MID0035_r1
 * @typedef {MidTypeFromStruct<typeof rev2>} MID0035_r2
 * @typedef {MidTypeFromStruct<typeof rev3>} MID0035_r3
 * @typedef {MidTypeFromStruct<typeof rev4>} MID0035_r4
 * @typedef {MidTypeFromStruct<typeof rev5>} MID0035_r5
 * @typedef {MID0035_r1 | MID0035_r2 | MID0035_r3 | MID0035_r4 | MID0035_r5} MID0035
 */

const revisions = /** @type {import("../helpers.js").DeepWriteable<[rev1, rev2, rev3, rev4, rev5]>} */ ([ rev1, rev2, rev3, rev4, rev5 ]);

/**
 * @param {import('../mid').EncodedMID} msg 
 * @param {any} opts
 * @param {(err: Error | null, msg?: MID0035) => void} cb 
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
 * @param {MID0035} msg 
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
    return [1, 2, 3, 4, 5];
}

module.exports = {
    parser,
    serializer,
    revision
};
