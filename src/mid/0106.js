//@ts-check
/*
  Copyright: (c) 2018-2020, Smart-Tech Controle e Automação
  GNU General Public License v3.0+ (see LICENSE or https://www.gnu.org/licenses/gpl-3.0.txt)
*/
const helpers = require("../helpers.js");
const processParser = helpers.processParser;
const processKey = helpers.processKey;

const rev1 = /** @type {const} */ ({
    mid: 106,
    revision: 1,
    fields: {
        totalNoOfMessages: { key: 1, type: 'num', len: 2 },
        messageNumber: { key: 2, type: 'num', len: 2 },
        dataNoSystem: { key: 3, type: 'num', len: 10 },
        stationNo: { key: 4, type: 'num', len: 2 },
        stationName: { key: 5, type: 'str', len: 20 },
        time: { key: 6, type: 'str', len: 19 },
        modeNo: { key: 7, type: 'num', len: 2 },
        modeName: { key: 8, type: 'str', len: 20 },
        simpleStatus: { key: 9, type: 'num', len: 1 },
        pmStatus: { key: 10, type: 'num', len: 1 },
        wpId: { key: 11, type: 'str', len: 40 },
        numberOfBolts: { key: 12, type: 'num', len: 2 },
        
        /** these repeat for each numberOfBolts, starting at parameter number 13 */
        bolts: {
            key: 13,
            repeatField: 'numberOfBolts',
            fields: {
                ordinalBoltNumber: { key: 1, type: 'num', len: 2 },
                simpleBoltStatus: { key: 2, type: 'num', len: 1 },
                torqueStatus: { key: 3, type: 'num', len: 1 },
                angleStatus: { key: 4, type: 'num', len: 1 },
                boltT: { key: 5, type: 'num', len: 7 },
                boltA: { key: 6, type: 'num', len: 7 },
                boltTHighLimit: { key: 7, type: 'num', len: 7 },
                boltTLowLimit: { key: 8, type: 'num', len: 7 },
                boltAHighLimit: { key: 9, type: 'num', len: 7 },
                boltALowLimit: { key: 10, type: 'num', len: 7 }
            },
        }
    },
});

const rev2 = /** @type {const} */ ({ ...rev1, revision: 2 });
const rev3 = /** @type {const} */ ({ ...rev1, revision: 3 });

/**
 * @typedef {import("../helpers").MidTypeFromStruct<typeof rev1 | typeof rev2 | typeof rev3>} MID0106
 */

/**
 * @param {import('../helpers').EncodedMID} msg
 * @param {any} opts
 * @param {(err: Error | null, msg?: MID0106) => void} cb
 */
function parser(msg, opts, cb) {
    let buffer = msg.payload;
    msg.payload = {};

    let status = true;

    let revision = msg.revision || 1;

    switch (revision) {
        case 1:
        case 2:
        case 3:
            let position = {
                value: 0
            };

            const keys = revKeys;

            for (let i = 0; i < keys.length; i++) {
                const key = keys[i];
                status = status &&
                    processKey(msg, buffer, key[0], i + 1, 2, position, cb) &&
                    processParser(msg, buffer, key[0], key[1], key[2], position, cb);
            }

            if (!status) return; //we've already failed, return

            // these parameters repeats for each numberOfBolts
            msg.payload.bolts = [];
            for (let boltNr = 0; boltNr < msg.payload.numberOfBolts; boltNr++){
                // let's fake a message for the parsing, so we can get it's payload
                // and copy to the real message later
                let boltPart = { 
                    mid: msg.mid,
                    payload: {}
                }

                // parse items
                for (let i = 0; i < boltKeys.length; i++) {
                    const key = boltKeys[i];
                    status = status &&
                        processKey(boltPart, buffer, key[0], i + 13, 2, position, cb) &&
                        processParser(boltPart, buffer, key[0], key[1], key[2], position, cb);
                }

                if (!status) return; //we've already failed, return

                //copy from fake message to real one
                msg.payload.bolts.push(boltPart.payload);
            }

            // get count of special values
            status = status &&
                processKey(msg, buffer, "numberOfSpecialValues", 23, 2, position, cb) &&
                processParser(msg, buffer, "numberOfSpecialValues", "number", 2, position, cb);

            // special values
            msg.payload.specialValues = Array(msg.payload.numberOfSpecialValues);
            for (let i = 0; i < msg.payload.specialValues.length; i++) {
                const specialValueMsg = { payload: {} };
                status = status &&
                    processParser(specialValueMsg, buffer, "variableName", "string", 20, position, cb) &&
                    processParser(specialValueMsg, buffer, "variableType", "string", 2, position, cb) &&
                    processParser(specialValueMsg, buffer, "variableLength", "number", 2, position, cb);

                // Open Protocol spec doesn"t seem to specify what possible values for the type are, so using string just in case
                status = status &&
                    processParser(specialValueMsg, buffer, "variableValue", "string", specialValueMsg.payload.variableLength, position, cb);
                msg.payload.specialValues[i] = specialValueMsg.payload;
            }

            break;
        default:
            cb(new Error(`[Parser MID${msg.mid}] invalid revision [${msg.revision}]`));
            return;
    }

    if (status) {
        cb(null, msg);
    }
}

/**
 * @param {MID0106} msg 
 * @param {any} opts 
 * @param {(err: Error | null, msg?: import('../helpers').EncodedMID) => void} cb
 */
function serializer(msg, opts, cb) {
    let buf;
    let statusprocess = false;

    let position = {
        value: 0,
    };

    msg.revision = msg.revision || 1;

    switch (msg.revision) {
        case 1:
        case 2:
        case 3:
            position.value = 121; // standard size without bolts or special values
            position.value += 47 * msg.payload.bolts.length; // additional bytes per bolt
            position.value += msg.payload.specialValues.reduce((prev, sv) => {
                return 
            }, 0); // additional bytes per special value
            break;
        default:
            cb(new Error(`[Serializer MID${msg.mid}] invalid revision [${msg.revision}]`));
            break;
    }
    
    msg.payload = buf;
    cb(null, msg);
}

function revision() {
    return [1, 2, 3];
}

module.exports = {
    parser,
    serializer,
    revision
};
