//@ts-check
/*
  Copyright: (c) 2018-2020, Smart-Tech Controle e Automação
  GNU General Public License v3.0+ (see LICENSE or https://www.gnu.org/licenses/gpl-3.0.txt)
*/

const fs = require("fs");
const path = require("path");
const codes = require('./constants');
const encoding = codes.defaultEncoder;

/**
 * @typedef {import('./mid').MID} MID
 */

/**
 * @type {Array<{
 *  parser: (msg: EncodedMID, opts: unknown, cb: (err: Error | null, msg?: MID) => void) => void;
 *  serializer: (msg: MID, opts: unknown, cb: (err: Error | null, msg?: EncodedMID) => void) => void;
 * }>}
 */
let midList;

/**
 * @description Converts a string or a number to a string with a determined @param size length.
 * @param {number|String} n the element to be padded
 * @param {number} size the desired length of the string
 * @param {number} [base=10] the base used to convert @param n to a string when it's a number
 * @param {String} [elm='0'] the character used to fill the empty positions
 * @param {boolean} [trimLeft=false] whether we should remove the left side of the string if it's bigger than the size
 * @returns {String}
 */
function padLeft(n, size, base, elm, trimLeft) {
    n = n.toString(base || 10);
    n = trimLeft ? n.substring(n.length - size) : n.substring(0, size);
    return new Array(size - n.length + 1).join(elm || '0').concat(n);
}

/**
 * @description Converts a string or a number to a string with a determined @param size length.
 * @param {number|String} n the element to be padded
 * @param {number} size the desired length of the string
 * @param {number} base the base used to convert @param n to a string when it's a number
 * @param {String} [elm='0'] the character used to fill the empty positions
 * @param {boolean} [trimLeft=false] whether we should remove the left side of the string if it's bigger than the size
 * @returns {String}
 */
function padRight(n, size, base, elm, trimLeft) {
    n = n.toString(base || 10);
    n = trimLeft ? n.substring(n.length - size) : n.substring(0, size);
    return n.concat(new Array(size - n.length + 1).join(elm || '0'));
}

/**
 * @description This method returns all implemented MIDs. The implemented MIDs must be saved in "/node-open-protocol/src/mid".
 */
function getMids() {

    if (midList) {
        return midList;
    }

    midList = [];

    const listFiles = fs.readdirSync(path.join(__dirname, ".", "mid"));

    listFiles.forEach((file) => {

        if (path.extname(file) !== ".js") {
            return;
        }

        midList[Number(path.basename(file, ".js"))] = require("./mid/" + file);

    });

    return midList;
}

/**
 * @description This method serializes a field in [parameter] where,
 * the values are read from [message.payload[parameter]], check type with [type] and
 * add in [buffer] in position [position.value] with length [length].
 *
 * The [cb] function is called in cases of an error, sending the error as parameter.
 * The return of this function is a boolean, true: the process without errors or false: the process with an error.
 *
 * @param {any} message 
 * @param {Buffer} buffer 
 * @param {string} parameter 
 * @param {string} type 
 * @param {number} length 
 * @param {{ value: number }} position 
 * @param {Function} cb 
 * @returns {boolean}
 */
function serializerField(message, buffer, parameter, type, length, position, cb) {

    position.value -= length;

    if (message.payload[parameter] === undefined) {
        cb(new Error(`[Serializer] MID[${message.mid}] parameter [${parameter}] not exist`));
        return false;
    }

    switch (type) {

        case "string":
            buffer.write(padRight(message.payload[parameter], length, 10, " "), position.value, encoding);
            break;

        case "rawString":
            buffer.write(padRight(message.payload[parameter], length, 10, " "), position.value, encoding);
            break;

        case "number":

            if (isNaN(message.payload[parameter])) {
                cb(new Error(`[Serializer] MID[${message.mid}] - type invalid isNaN - parameter: [${parameter}] value: [${message.payload[parameter]}] `));
                return false;
            }

            buffer.write(padLeft(message.payload[parameter], length), position.value, encoding);
            break;

        default:
            cb(new Error(`[Serializer] MID[${message.mid}] - type is not defined`));
            return false;
    }

    return true;
}

/**
 * @description This method performs the serialization of key, the value to be serialized in [buffer]
 * comes from [key] on [position.value] with length [length].
 * The [key] must be a Number.
 *
 * The [cb] function is called in cases of error, sending the error as parameter.
 * The return of this function is boolean, true: the process without errors or false: the process with an error.
 *
 * @param {any} message 
 * @param {Buffer} buffer 
 * @param {number} key 
 * @param {number} length 
 * @param {{ value: number }} position 
 * @param {Function} cb 
 * @returns {boolean}
 */
function serializerKey(message, buffer, key, length, position, cb) {

    position.value -= length;

    if (isNaN(key)) {
        cb(new Error(`[Serializer] MID[${message.mid}] key invalid [${key}]`));
        return false;
    }

    buffer.write(padLeft(key, length), position.value, encoding);

    return true;
}

/**
 * @description This method perform the extraction of [parameter], the value extracted comes from [buffer] from
 * the position [position.value] with length [parameterlength] and being converted to [parameterType], this
 * value is add in [message.payload[parameter]].
 *
 * The [cb] function is called in cases of error, sending the error as parameter.
 * The return of this function is boolean, true: the process without errors or false: the process with an error.
 *
 * @param {any} message Object in use for update
 * @param {Buffer} buffer Buffer with content for extracting information
 * @param {string} parameter Name of parameter extracted
 * @param {string} parameterType Type of information extracted "string" | "rawString" | "number"  
 * @param {number} parameterLength Size of information extracted
 * @param {{ value: number }} position Position on buffer this information {value: position}
 * @param {Function} cb
 * @returns {boolean} status process
 */
function processParser(message, buffer, parameter, parameterType, parameterLength, position, cb) {

    let length = parameterLength;
    parameterLength = position.value + parameterLength;

    switch (parameterType) {
        case "string":
            message.payload[parameter] = buffer.toString(encoding, position.value, parameterLength).trim();
            break;

        case "rawString":
            message.payload[parameter] = buffer.toString(encoding, position.value, parameterLength);
            if (message.payload[parameter].length !== length) {
                cb(new Error(`invalid value, mid: ${message.mid}, parameter: ${parameter}, payload: ${message.payload}`));
                return false;
            }
            break;

        case "number":
            message.payload[parameter] = Number(buffer.toString(encoding, position.value, parameterLength));
            if (isNaN(message.payload[parameter])) {
                cb(new Error(`invalid value, mid: ${message.mid}, parameter: ${parameter}, payload: ${message.payload}`));
                return false;
            }
            break;

        default:
            cb(new Error(`invalid parameterType`));
            return false;

    }

    position.value = parameterLength;

    return true;
}

/**
 * @description This method checks the key of [parameter], the value extracted comes from [buffer] from
 * the position [keyPosition.value] with length [keylength], this value is compared with [key].
 *
 * The return of this function is boolean, true: the value extracted is equal [key] or false: case not.
 * The [cb] function is called in cases of error, sending the error as parameter.
 *
 * @param {any} object 
 * @param {Buffer} buffer 
 * @param {string} parameter 
 * @param {number} key 
 * @param {number} keyLength 
 * @param {{ value: number }} keyPosition 
 * @param {Function} cb 
 * @returns {boolean}
 */
function processKey(object, buffer, parameter, key, keyLength, keyPosition, cb) {

    keyLength = keyPosition.value + keyLength;

    let receiver = Number(buffer.toString(encoding, keyPosition.value, keyLength));

    if (receiver !== key) {
        cb(new Error(`invalid key, mid: ${object.mid}, parameter: ${parameter}, expect: ${key}, receiver: ${receiver} payload: ${JSON.stringify(object.payload)}`));
        return false;
    }

    keyPosition.value = keyLength;

    return true;
}

/**
 * @description This method performs a check if in [position.value] of [buffer] the value is [NUL].
 * The return of this function is boolean, true: the value is [NUL] or false: case not.
 *
 * The [cb] function is called in cases of error, sending the error as parameter.
 *
 * @param {any} object
 * @param {Buffer} buffer
 * @param {string} parameter
 * @param {{ value: number }} position
 * @param {Function} cb
 * @returns {boolean}
 */
function testNul(object, buffer, parameter, position, cb) {

    if (buffer[position.value] !== 0) {
        cb(new Error(`invalid value, mid: ${object.mid}, parameter: ${parameter}, payload: ${object.payload}`));
        return false;
    }

    position.value += 1;

    return true;
}

/**
 * @description This method performs the extraction of the structure [Data Field], is perform [count] times,
 * from the position [position.value], these structures are stored in an array on [message.payload[parameter]].
 *
 * The [cb] function is called in cases of error, sending the error as parameter.
 * The return of this function is boolean, true: the process without errors or false: the process with an error.
 * 
 * @see Specification OpenProtocol_Specification_R_2_8_0_9836 4415 01.pdf Page 34
 * 
 * @param {any} message 
 * @param {Buffer} buffer 
 * @param {string} parameter 
 * @param {number} count 
 * @param {{ value: number }} position 
 * @param {Function} cb 
 * @returns {boolean}
 */
function processDataFields(message, buffer, parameter, count, position, cb) {

    let control = 0;

    if (count > 0) {

        message.payload[parameter] = [];

        while (control < count) {

            let dataFields = {};

            let parameterID = buffer.toString(encoding, position.value, position.value + 5).trim();

            if (parameterID === "" || isNaN(Number(parameterID)) || Number(parameterID) < 0) {
                cb(new Error(`invalid value, mid: ${message.mid}, parameter: ${parameter} - parameterID, payload: ${message.payload}`));
                return false;
            }
            dataFields.parameterID = parameterID;
            dataFields.parameterName = (/** @type {Record<string, string>} */ (codes.PID))[parameterID] || "";
            position.value += 5;

            let length = Number(buffer.toString(encoding, position.value, position.value + 3));

            if (isNaN(length) || length < 0) {
                cb(new Error(`invalid value, mid: ${message.mid}, parameter: ${parameter} - length, payload: ${message.payload}`));
                return false;
            }
            dataFields.length = length;
            position.value += 3;

            let dataType = Number(buffer.toString(encoding, position.value, position.value + 2));

            if (isNaN(dataType) || dataType < 0) {
                cb(new Error(`invalid value, mid: ${message.mid}, parameter: ${parameter} - dataType, payload: ${message.payload}`));
                return false;
            }
            dataFields.dataType = dataType;
            position.value += 2;

            let unit = buffer.toString(encoding, position.value, position.value + 3).trim();

            if (unit === "" || isNaN(Number(unit)) || Number(unit) < 0) {
                cb(new Error(`invalid value, mid: ${message.mid}, parameter: ${parameter} - unit, payload: ${message.payload}`));
                return false;
            }
            dataFields.unit = unit;
            dataFields.unitName = (/** @type {Record<string, string>} */ (codes.UNIT))[unit] || "";
            position.value += 3;

            let stepNumber = Number(buffer.toString(encoding, position.value, position.value + 4));

            if (isNaN(stepNumber) || stepNumber < 0) {
                cb(new Error(`invalid value, mid: ${message.mid}, parameter: ${parameter} - stepNumber, payload: ${message.payload}`));
                return false;
            }
            dataFields.stepNumber = stepNumber;
            position.value += 4;

            let dataValue = buffer.toString(encoding, position.value, position.value + length).trim();

            if (dataValue === "") {
                cb(new Error(`invalid value, mid: ${message.mid}, parameter: ${parameter} - dataValue, payload: ${message.payload}`));
                return false;
            }
            dataFields.dataValue = dataValue;
            position.value += length;

            message.payload[parameter].push(dataFields);

            control += 1;
        }
    }
    return true;
}

/**
 * @description This method performs the extraction of the structure [Resolution Field], is perform [count] times,
 * from the position [position.value], these structures are stored in an array on [message.payload[parameter]].
 *
 * The [cb] function is called in cases of error, sending the error as parameter.
 * The return of this function is boolean, true: the process without errors or false: the process with an error.
 *
 * @see Specification OpenProtocol_Specification_R_2_8_0_9836 4415 01.pdf Page 260
 * 
 * @param {any} message 
 * @param {Buffer} buffer 
 * @param {string} parameter 
 * @param {number} count 
 * @param {{ value: number }} position 
 * @param {function} cb 
 * @returns {boolean}
 */
function processResolutionFields(message, buffer, parameter, count, position, cb) {

    let control = 0;

    if (count > 0) {

        message.payload[parameter] = [];

        while (control < count) {

            let resolutionFields = {};

            let firstIndex = Number(buffer.toString(encoding, position.value, position.value + 5));

            if (isNaN(firstIndex) || firstIndex < 0) {
                cb(new Error(`invalid value, mid: ${message.mid}, parameter: ${parameter}, payload: ${message.payload}`));
                return false;
            }
            resolutionFields.firstIndex = firstIndex;
            position.value += 5;
 
            let lastIndex = Number(buffer.toString(encoding, position.value, position.value + 5));

            if (isNaN(lastIndex) || lastIndex < 0) {
                cb(new Error(`invalid value, mid: ${message.mid}, parameter: ${parameter}, payload: ${message.payload}`));
                return false;
            }
            resolutionFields.lastIndex = lastIndex;
            position.value += 5;
 
            let length = Number(buffer.toString(encoding, position.value, position.value + 3));

            if (isNaN(length) || length < 0) {
                cb(new Error(`invalid value, mid: ${message.mid}, parameter: ${parameter}, payload: ${message.payload}`));
                return false;
            }
            resolutionFields.length = length;
            position.value += 3;

            let dataType = Number(buffer.toString(encoding, position.value, position.value + 2));

            if (isNaN(dataType) || dataType < 0) {
                cb(new Error(`invalid value, mid: ${message.mid}, parameter: ${parameter}, payload: ${message.payload}`));
                return false;
            }
            resolutionFields.dataType = dataType;
            position.value += 2;

            let unit = buffer.toString(encoding, position.value, position.value + 3).trim();

            if (unit === "" || isNaN(Number(unit)) || Number(unit) < 0) {
                cb(new Error(`invalid value, mid: ${message.mid}, parameter: ${parameter}, payload: ${message.payload}`));
                return false;
            }
            resolutionFields.unit = unit;
            resolutionFields.unitName = (/** @type {Record<string, string>} */ (codes.UNIT))[unit] || "";
            position.value += 3;

            let timeValue = buffer.toString(encoding, position.value, position.value + length).trim();

            if (timeValue === "") {
                cb(new Error(`invalid value, mid: ${message.mid}, parameter: ${parameter}, payload: ${message.payload}`));
                return false;
            }
            resolutionFields.timeValue = timeValue;
            position.value += length;

            message.payload[parameter].push(resolutionFields);

            control += 1;
        }
    }
    return true;
}

/**
 * @typedef {import('./mid').EncodedMID} EncodedMID
 * @typedef {import('./mid').MidStructBase} MidStructBase
 */

/**
 * @template REV
 * @typedef {import('./mid').MidTypeFromStruct<REV>} MidTypeFromStruct<REV>
 */

/**
 * @param {(import("./mid").MidStructParam | import("./mid").MidStructRepeatedParam)[]} structs
 * @returns {(import("./mid").MidStructParam | import("./mid").MidStructRepeatedParam)[]}
 */
function sortStructs (structs) {
    return structs.sort((a, b) => {
        if (a.key === null || b.key === null) {
            return 0;
        }
        return a.key < b.key ? -1 : 1;
    });
}

/**
 * @param {EncodedMID} msg original encoded message
 * @param {Record<string, any>} payload the obj to build and mutate
 * @param {number} startPos
 * @param {(import("./mid").MidStructParam | import("./mid").MidStructRepeatedParam)[]} structs
 * @returns {number} how much the parsing moved
 */
function parseParams (msg, payload, startPos, structs) {
    let position = startPos;

    for (const struct of sortStructs(structs)) {
        // if the key is null, the param is computed and we can skip it
        if (struct.key !== null) {

            // does this param get repeated?
            if ('repeatParam' in struct) {
                payload[struct.name] = [];
    
                /** how many times this param is repeated */
                const numRepeats = payload[struct.repeatParam];
                if (numRepeats === undefined) {
                    throw new Error(`repeated param "${struct.name}" depends on param "${struct.repeatParam}", but it cannot be found.`);
                }
    
                // parse each of the repeated items
                for (let i = 0; i < numRepeats; i++) {
                    /** @type {Record<string, any>} */
                    const repeatedItem = {};
    
                    // parse each param of the repeated item
                    try {
                        position += parseParams(msg, repeatedItem, position, struct.params);
                    } catch (err) {
                        throw new Error(`failed to parse a "${struct.name}": ${(/** @type {Error} */ (err)).name}`);
                    }
    
                    // add the repeated item to the repeated param
                    payload[struct.name].push(repeatedItem);
                }
            } else {
                // this is a non repeating param
                
                // should we check for a param key?
                if (struct.keyl !== null) {
                    const keyl = struct.keyl || 2; // default key length is 2
                    const receiver = Number(msg.payload.toString(encoding, position, position + keyl));
                    if (receiver !== struct.key) {
                        throw new Error(`invalid key, mid: ${msg.mid}, parameter: ${struct.name}, expect: ${struct.key}, receiver: ${receiver} payload: ${JSON.stringify(payload)}`);
                    }
        
                    position += keyl;
                }
        
                // if the len is null, then we should parse this param as a string from current position to the end of the buffer
                if (struct.len === null) {
                    payload[struct.name] = msg.payload.toString(encoding, position);
                    position = msg.payload.byteLength; // we parsed until the end of the buffer
        
                    // measure how much we moved, even though this probably won't be used if we parse the whole buffer
                    return position - startPos;
                }
        
                /** @type {number} */
                let len;
    
                // special case: len is the name of another param whose value is the length of the data
                if (typeof struct.len === 'string') {
        
                    // verify param exists
                    if (typeof payload[struct.len] !== 'number') {
                        throw new Error(`length of param "${struct.name}" depends on param "${struct.len}", but it cannot be found. (mid: ${msg.mid})`);
                    }
        
                    len = payload[struct.len];
                } else {
                    // normal case
                    len = struct.len;
                }
    
                if (struct.type === "str") {
                    payload[struct.name] = msg.payload.toString(encoding, position, position + len).trim();
                } else if (struct.type === 'rawStr') {
                    payload[struct.name] = msg.payload.toString(encoding, position, position + len);
                    if (payload[struct.name].length !== len) {
                        new Error(`invalid length, mid: ${msg.mid}, parameter: ${struct.name}, payload: ${payload}`)
                    }
                } else if (struct.type === 'num') {
                    payload[struct.name] = Number(msg.payload.toString(encoding, position, position + len));
                    if (isNaN(payload[struct.name])) {
                        new Error(`invalid value, mid: ${msg.mid}, parameter: ${struct.name}, payload: ${JSON.stringify(payload)}`)
                    }
                }
        
                position += len;
            }
        }
    }
    
    return position - startPos;
}


/**
 * @template T
 * @typedef {{ -readonly [P in keyof T]: DeepWriteable<T[P]> }} DeepWriteable<T>;
 */

/**
 * @template {import('./mid').MidStructBase[]} REVS
 * @param {EncodedMID} msg
 * @param {REVS} revisions
 * @returns {MidTypeFromStruct<REVS[number]>}
 */
function parse (msg, revisions) {
    const rev = revisions.find(r => r.revision === (msg.revision || 1));
    if (!rev) {
        throw new Error(`[Parser MID${msg.mid}] invalid revision [${msg.revision}]`)
    }

    const payload = {};
    try {
        parseParams(msg, payload, 0, rev.params);
    } catch (err) {
        throw new Error(`[Parser MID${msg.mid}] ${(/** @type {Error} */ (err)).message}`)
    }

    return (/** @type {MidTypeFromStruct<REVS[number]>} */ ({
        ...msg,
        payload,
    }));
}

/**
 * @param {Record<string, any>} payload the mid payload in object form
 * @param {(import("./mid").MidStructParam | import("./mid").MidStructRepeatedParam)[]} structs
 * @returns {string} the serialized payload
 */
function serializeParams (payload, structs) {
    let result = '';
    for (const struct of sortStructs(structs)) {
        if (struct.key === null) {
            // this param is computed
            continue;
        }

        // does this param get repeated?
        if ('repeatParam' in struct) {
            const repeatCount = payload[struct.repeatParam];
            if (repeatCount === undefined) {
                throw new Error(`length of param "${struct.name}" depends on param "${struct.repeatParam}", but it cannot be found in the payload.`)
            }
            if (payload[struct.repeatParam] !== payload[struct.name].length) {
                throw new Error(`invalid length for "${struct.name}", "${struct.repeatParam}" is ${repeatCount}`)
            }

            for (const repeatItem of payload[struct.name]) {
                try {
                    result += serializeParams(repeatItem, struct.params);
                } catch (err) {
                    throw new Error(`failed to serialize a "${struct.name}": ${(/** @type {Error} */ (err)).message}`);
                }
            }
        } else {
            // this is a non-repeating param

            // should we add a param key?
            if (struct.keyl !== null ) {
                const keyl = struct.keyl || 2; // default key length is 2
                const keyStr = padLeft(struct.key, keyl);
                if (keyStr.length !== keyl) {
                    throw new Error(`unexpected length of key "${struct.key}" in param "${struct.name}". expected a length of ${keyl}`);
                }
                result += keyStr;
            }

            if (struct.len === null) {
                // special case: serialize the entire param as the last param to be serialized
                result += String(payload[struct.name]);
                return result;
            }

            /** @type {number} */
            let len;

            if (typeof struct.len === 'string') {
                // special case: len is the name of another param whose value sets the length

                // verify param exists
                if (typeof payload[struct.len] !== 'number') {
                    throw new Error(`length of param "${struct.name}" depends on param "${struct.len}", but it cannot be found.`);
                }
    
                len = payload[struct.len];
            } else {
                // normal case
                len = struct.len;
            }

            const val = payload[struct.name];
            /** @type {string} */
            let valStr;
            if (struct.type === 'num') {
                if (isNaN(val)) {
                    throw new Error(`param "${struct.name}" value type is invalid (isNaN: ${val}). `)
                }
                valStr = padLeft(val, len, 10, '0');
            } else {
                // string types
                valStr = padRight(val, len, 10, ' ');
            }
            if (valStr.length !== len) {
                throw new Error(`unexpected length of param "${struct.name}": "${valStr}". Expected a length of ${len}`);
            }
            result += valStr;
        }
    }
    return result;
}

/**
 * @template {import('./mid').MidStructBase[]} REVS
 * @param {MidTypeFromStruct<REVS[number]>} msg
 * @param {REVS} revisions
 * @returns {Buffer}
 */
function serialize (msg, revisions) {
    const rev = revisions.find(r => r.revision === (msg.revision || 1));
    if (!rev) {
        throw new Error(`[Serializer MID${msg.mid}] invalid revision [${msg.revision}]`);
    }

    try {
        return Buffer.from(serializeParams(msg.payload, rev.params), encoding);
    } catch (err) {
        throw new Error(`[Serializing MID${msg.mid}]: ${(/** @type {Error} */ (err)).message}`);
    }
}

module.exports = {
    getMids,
    testNul,
    padLeft,
    padRight,
    processKey,
    processParser,
    processDataFields,
    processResolutionFields: processResolutionFields,
    serializerField,
    serializerKey,
    parse,
    serialize,
};
