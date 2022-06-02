//@ts-check
/*
  Copyright: (c) 2018-2020, Smart-Tech Controle e Automação
  GNU General Public License v3.0+ (see LICENSE or https://www.gnu.org/licenses/gpl-3.0.txt)
*/

const helpers = require("../helpers.js");
const processParser = helpers.processParser;
const serializerField = helpers.serializerField;

const rev1 = /** @type {const} */ ({
    mid: 50,
    revision: 1,
    fields: [
        { key: 1, type: "rawStr", len: 25, keyl: null, name: 'numberVIN' },
    ],
});

/**
 * @typedef {import("../helpers").MidTypeFromStruct<rev1>} MID0050
 */

/**
 * @param {import('../helpers').EncodedMID} msg
 * @param {any} opts
 * @param {(err: Error | null, msg?: MID0050) => void} cb
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
            processParser(msg, buffer, "numberVIN", "rawString", 25, position, cb) &&
                cb(null, msg);
            break;

        default:
            cb(new Error(`[Parser MID${msg.mid}] invalid revision [${msg.revision}]`));
            break;
    }
}

/**
 * @param {MID0050} msg 
 * @param {any} opts 
 * @param {(err: Error | null, msg?: import('../helpers').EncodedMID) => void} cb
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

            buf = Buffer.alloc(25);

            position.value = 25;

            statusprocess = serializerField(msg, buf, "numberVIN", "rawString", 25, position, cb);

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
        name: "numberVIN",
        type: "string",
        desc: "25 ASCII characters"
    }]
};

module.exports = {
    params,
    parser,
    serializer,
    revision
};
