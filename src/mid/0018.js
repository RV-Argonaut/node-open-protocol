//@ts-nocheck
/*
  Copyright: (c) 2018-2020, Smart-Tech Controle e Automação
  GNU General Public License v3.0+ (see LICENSE or https://www.gnu.org/licenses/gpl-3.0.txt)
*/

const helpers = require("../helpers.js");
const processParser = helpers.processParser;
const serializerField = helpers.serializerField;

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

/**
 * @param {import('../mid').EncodedMID} msg
 * @param {any} opts
 * @param {(err: Error | null, msg?: MID0018) => void} cb
 */
function parser(msg, opts, cb) {

    let buffer = msg.payload;
    msg.payload = {};

    let position = {
        value: 0
    };

    msg.revision = msg.revision || 1;

    switch (msg.revision) {
        case 1:
            processParser(msg, buffer, "parameterSetID", "number", 3, position, cb) &&
                cb(null, msg);
            break;

        default:
            cb(new Error(`[Parser MID${msg.mid}] invalid revision [${msg.revision}]`));
            break;
    }
}

/**
 * @param {MID0018} msg 
 * @param {any} opts 
 * @param {(err: Error | null, msg?: import('../mid').EncodedMID) => void} cb
 */
function serializer(msg, opts, cb) {

    let buf;
    let statusprocess = false;

    let position = {
        value: 0
    };

    msg.revision = msg.revision || 1;

    switch (msg.revision) {
        case 1:
            buf = Buffer.alloc(3);

            position.value = 3;

            statusprocess = serializerField(msg, buf, "parameterSetID", "number", 3, position, cb);

            if (!statusprocess) {
                return;
            }

            msg.payload = buf;

            cb(null, msg);

            break;

        default:
            cb(new Error(`[Serializer MID${msg.mid}] invalid revision [${msg.revision}]`));
            break;
    }
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
