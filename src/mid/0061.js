//@ts-check
/*
  Copyright: (c) 2018-2020, Smart-Tech Controle e Automação
  GNU General Public License v3.0+ (see LICENSE or https://www.gnu.org/licenses/gpl-3.0.txt)
*/

const helpers = require("../helpers.js");

const rev1 = /** @type {const} */ ({
    mid: 61,
    revision: 1,
    params: [
        { key: 1, type: "num", len: 4, name: "cellID" },
        { key: 2, type: "num", len: 2, name: "channelID" },
        { key: 3, type: "str", len: 25, name: "torqueControllerName" },
        { key: 4, type: "rawStr", len: 25, name: "numberVIN" },
        { key: 5, type: "num", len: 2, name: "jobID" },
        { key: 6, type: "num", len: 3, name: "parameterSetID" },
        { key: 7, type: "num", len: 4, name: "batchSize" },
        { key: 8, type: "num", len: 4, name: "batchCounter" },
        { key: null, type: "str", len: 0, name: "tighteningStatus" },
        { key: 9, type: "num", len: 1, name: "_tighteningStatus" },
        { key: null, type: "str", len: 0, name: "torqueStatus" },
        { key: 10, type: "num", len: 1, name: "_torqueStatus" },
        { key: null, type: "str", len: 0, name: "angleStatus" },
        { key: 11, type: "num", len: 1, name: "_angleStatus" },
        { key: 12, type: "num", len: 6, name: "torqueMinLimit" },
        { key: 13, type: "num", len: 6, name: "torqueMaxLimit" },
        { key: 14, type: "num", len: 6, name: "torqueFinalTarget" },
        { key: 15, type: "num", len: 6, name: "torque" },
        { key: 16, type: "num", len: 5, name: "angleMin" },
        { key: 17, type: "num", len: 5, name: "angleMax" },
        { key: 18, type: "num", len: 5, name: "finalAngleTarget" },
        { key: 19, type: "num", len: 5, name: "angle" },
        { key: 20, type: "str", len: 19, name: "timeStamp" },
        { key: 21, type: "str", len: 19, name: "timeLastChange" },
        { key: null, type: "str", len: 0, name: "batchStatus" },
        { key: 22, type: "num", len: 1, name: "_batchStatus" },
        { key: 23, type: "num", len: 10, name: "tighteningID" },
    ],
});

const rev2 = /** @type {const} */ ({
    mid: 61,
    revision: 2,
    params: [
        { key: 1, type: "num", len: 4, name: "cellID" },
        { key: 2, type: "num", len: 2, name: "channelID" },
        { key: 3, type: "str", len: 25, name: "torqueControllerName" },
        { key: 4, type: "rawStr", len: 25, name: "numberVIN" },
        { key: 5, type: "num", len: 4, name: "jobID" },
        { key: 6, type: "num", len: 3, name: "parameterSetID" },
        { key: null, type: "str", len: 0, name: "strategy" },
        { key: 7, type: "num", len: 2, name: "_strategy" },
        { key: null, type: /** @type {readonly (string|undefined)[]} */ ([]), len: 0, name: "strategyOptions" },
        { key: 8, type: "num", len: 5, name: "_strategyOptions" },
        { key: 9, type: "num", len: 4, name: "batchSize" },
        { key: 10, type: "num", len: 4, name: "batchCounter" },
        { key: null, type: "str", len: 0, name: "tighteningStatus" },
        { key: 11, type: "num", len: 1, name: "_tighteningStatus" },
        { key: null, type: "str", len: 0, name: "batchStatus" },
        { key: 12, type: "num", len: 1, name: "_batchStatus" },
        { key: null, type: "str", len: 0, name: "torqueStatus" },
        { key: 13, type: "num", len: 1, name: "_torqueStatus" },
        { key: null, type: "str", len: 0, name: "angleStatus" },
        { key: 14, type: "num", len: 1, name: "_angleStatus" },
        { key: null, type: "str", len: 0, name: "rundownAngleStatus" },
        { key: 15, type: "num", len: 1, name: "_rundownAngleStatus" },
        { key: null, type: "str", len: 0, name: "currentMonitoringStatus" },
        { key: 16, type: "num", len: 1, name: "_currentMonitoringStatus" },
        { key: null, type: "str", len: 0, name: "selftapStatus" },
        { key: 17, type: "num", len: 1, name: "_selftapStatus" },
        { key: null, type: "str", len: 0, name: "prevailTorqueMonitoringStatus" },
        { key: 18, type: "num", len: 1, name: "_prevailTorqueMonitoringStatus" },
        { key: null, type: "str", len: 0, name: "prevailTorqueCompensateStatus" },
        { key: 19, type: "num", len: 1, name: "_prevailTorqueCompensateStatus" },
        { key: null, type: /** @type {readonly (string|undefined)[]} */ ([]), len: 0, name: "tighteningErrorStatus" },
        { key: 20, type: "num", len: 10, name: "_tighteningErrorStatus" },
        { key: 21, type: "num", len: 6, name: "torqueMinLimit" },
        { key: 22, type: "num", len: 6, name: "torqueMaxLimit" },
        { key: 23, type: "num", len: 6, name: "torqueFinalTarget" },
        { key: 24, type: "num", len: 6, name: "torque" },
        { key: 25, type: "num", len: 5, name: "angleMin" },
        { key: 26, type: "num", len: 5, name: "angleMax" },
        { key: 27, type: "num", len: 5, name: "finalAngleTarget" },
        { key: 28, type: "num", len: 5, name: "angle" },
        { key: 29, type: "num", len: 5, name: "rundownAngleMin" },
        { key: 30, type: "num", len: 5, name: "rundownAngleMax" },
        { key: 31, type: "num", len: 5, name: "rundownAngle" },
        { key: 32, type: "num", len: 3, name: "currentMonitoringMin" },
        { key: 33, type: "num", len: 3, name: "currentMonitoringMax" },
        { key: 34, type: "num", len: 3, name: "currentMonitoringValue" },
        { key: 35, type: "num", len: 6, name: "selftapMin" },
        { key: 36, type: "num", len: 6, name: "selftapMax" },
        { key: 37, type: "num", len: 6, name: "selftapTorque" },
        { key: 38, type: "num", len: 6, name: "prevailTorqueMonitoringMin" },
        { key: 39, type: "num", len: 6, name: "prevailTorqueMonitoringMax" },
        { key: 40, type: "num", len: 6, name: "prevailTorque" },
        { key: 41, type: "num", len: 10, name: "tighteningID" },
        { key: 42, type: "num", len: 5, name: "jobSequenceNumber" },
        { key: 43, type: "num", len: 5, name: "syncTighteningID" },
        { key: 44, type: "str", len: 14, name: "toolSerialNumber" },
        { key: 45, type: "str", len: 19, name: "timeStamp" },
        { key: 46, type: "str", len: 19, name: "timeLastChange" },
    ],
});

const rev3 = /** @type {const} */ ({
    mid: 61,
    revision: 3,
    params: [
        ...rev2.params,
        { key: 47, type: "str", len: 25, name: "parameterSetName" },
        { key: null, type: 'str', len: 0, name: "torqueValuesUnit" },
        { key: 48, type: "num", len: 1, name: "_torqueValuesUnit" },
        { key: null, type: 'str', len: 0, name: "resultType" },
        { key: 49, type: "num", len: 2, name: "_resultType" },
    ],
});

const rev4 = /** @type {const} */ ({
    mid: 61,
    revision: 4,
    params: [
        ...rev3.params,
        { key: 50, type: "str", len: 25, name: "identifierPart2" },
        { key: 51, type: "str", len: 25, name: "identifierPart3" },
        { key: 52, type: "str", len: 25, name: "identifierPart4" },
    ],
});

const rev5 = /** @type {const} */ ({
    mid: 61,
    revision: 5,
    params: [
        ...rev4.params,
        { key: 53, type: "str", len: 4, name: "customerToghteningErrorCode" }, // typo?
    ],
});

const rev6 = /** @type {const} */ ({
    mid: 61,
    revision: 6,
    params: [
        ...rev5.params,
        { key: 54, type: "num", len: 6, name: "prevailTorqueCompensateValue" },
        { key: null, type: /** @type {readonly (string|undefined)[]} */ ([]), len: 0, name: "tighteningErrorStatus2" },
        { key: 55, type: 'num', len: 10, name: "_tighteningErrorStatus2" },
    ],
});

const rev7 = /** @type {const} */ ({
  mid: 61,
  revision: 7,
  params: [
    ...rev6.params,
    { key: 56, type: "num", len: 7, name: "compensatedAngle" },
    { key: 57, type: "num", len: 7, name: "finalAngleDecimal" },
  ],
});

const rev998 = /** @type {const} */ ({
    mid: 61,
    revision: 998,
    params: [
        ...rev6.params,
        { key: 56, type: "num", len: 2, name: "numberStagesMultiStage" },
        { key: 57, type: "num", len: 2, name: "numberStageResults" },
        { key: 58, type: "str", len: null, name: "stageResult" },
    ],
});

const rev999 = /** @type {const} */ ({
    mid: 61,
    revision: 999,
    params: [
        { key: 1, keyl: null, type: "rawStr", len: 25, name: "numberVIN" },
        { key: 2, keyl: null, type: "num", len: 2, name: "jobID" },
        { key: 3, keyl: null, type: "num", len: 3, name: "parameterSetID" },
        { key: 4, keyl: null, type: "num", len: 4, name: "batchSize" },
        { key: 5, keyl: null, type: "num", len: 4, name: "batchCounter" },
        { key: null, keyl: null, type: "str", len: 0, name: "batchStatus" },
        { key: 6, keyl: null, type: "num", len: 1, name: "_batchStatus" },
        { key: null, keyl: null, type: "str", len: 0, name: "tighteningStatus" },
        { key: 7, keyl: null, type: "num", len: 1, name: "_tighteningStatus" },
        { key: null, keyl: null, type: "str", len: 0, name: "torqueStatus" },
        { key: 8, keyl: null, type: "num", len: 1, name: "_torqueStatus" },
        { key: null, keyl: null, type: "str", len: 0, name: "angleStatus" },
        { key: 9, keyl: null, type: "num", len: 1, name: "_angleStatus" },
        { key: 10, keyl: null, type: "num", len: 6, name: "torque" },
        { key: 11, keyl: null, type: "num", len: 5, name: "angle" },
        { key: 12, keyl: null, type: "str", len: 19, name: "timeStamp" },
        { key: 13, keyl: null, type: "str", len: 19, name: "timeLastChange" },
        { key: 14, keyl: null, type: "num", len: 10, name: "tighteningID" },
    ],
});


/**
 * @template MRS
 * @typedef {import('../mid').MidTypeFromStruct<MRS>} MidTypeFromStruct<MRS>
 */

/**
 * @typedef {MidTypeFromStruct<rev1>} MID0061_r1
 * @typedef {MidTypeFromStruct<rev2>} MID0061_r2
 * @typedef {MidTypeFromStruct<rev3>} MID0061_r3
 * @typedef {MidTypeFromStruct<rev4>} MID0061_r4
 * @typedef {MidTypeFromStruct<rev5>} MID0061_r5
 * @typedef {MidTypeFromStruct<rev6>} MID0061_r6
 * @typedef {MidTypeFromStruct<rev7>} MID0061_r7
 * @typedef {MidTypeFromStruct<rev998>} MID0061_r998
 * @typedef {MidTypeFromStruct<rev999>} MID0061_r999
 * @typedef {MID0061_r1 | MID0061_r2 | MID0061_r3 | MID0061_r4 | MID0061_r5 | MID0061_r6 | MID0061_r7 | MID0061_r998 | MID0061_r999 } MID0061
 */

const revisions = /** @type {import("../helpers.js").DeepWriteable<[rev1, rev2, rev3, rev4, rev5, rev6, rev7, rev998, rev999]>} */ (
    [ rev1, rev2, rev3, rev4, rev5, rev6, rev7, rev998, rev999 ]
);

const constantsMID = require("./MidConstants/MID0061");

/**
 * @param {import('../mid').EncodedMID} msg 
 * @param {any} opts
 * @param {(err: Error | null, msg?: MID0061) => void} cb 
 */
function parser(msg, opts, cb) {
    let result, err = null;
    try {
        /** @type {MID0061} */
        const parsedMid = helpers.parse(msg, revisions);

        if (parsedMid.revision === 7) {
            // these are only present on rev 7
            parsedMid.payload.compensatedAngle /= 100;
            parsedMid.payload.finalAngleDecimal /= 100;
        }

        if ('_angleStatus' in parsedMid.payload) {
            parsedMid.payload.angleStatus = constantsMID["status"][/** @type {keyof typeof constantsMID['status']} */ (parsedMid.payload._angleStatus.toString())];
        }
        if ('_batchStatus' in parsedMid.payload) {
            parsedMid.payload.batchStatus = checkOK(parsedMid.payload._batchStatus);
        }
        if ('_currentMonitoringStatus' in parsedMid.payload) {
            parsedMid.payload.currentMonitoringStatus = constantsMID["status"][/** @type {keyof typeof constantsMID['status']} */(parsedMid.payload._currentMonitoringStatus.toString())];
        }
        if ('prevailTorque' in parsedMid.payload) {
            parsedMid.payload.prevailTorque /= 100;
        }
        if ('_prevailTorqueCompensateStatus' in parsedMid.payload) {
            parsedMid.payload.prevailTorqueCompensateStatus = constantsMID["status"][/** @type {keyof typeof constantsMID['status']} */(parsedMid.payload._prevailTorqueCompensateStatus.toString())];
        }
        if ('prevailTorqueCompensateValue' in parsedMid.payload) {
            parsedMid.payload.prevailTorqueCompensateValue /= 100;
        }
        if ('prevailTorqueMonitoringMax' in parsedMid.payload) {
            parsedMid.payload.prevailTorqueMonitoringMax /= 100;
        }
        if ('prevailTorqueMonitoringMin' in parsedMid.payload) {
            parsedMid.payload.prevailTorqueMonitoringMin /= 100;
        }
        if ('_prevailTorqueMonitoringStatus' in parsedMid.payload) {
            parsedMid.payload.prevailTorqueMonitoringStatus = constantsMID["status"][/** @type {keyof typeof constantsMID['status']} */(parsedMid.payload._prevailTorqueMonitoringStatus.toString())];
        }
        if ('_resultType' in parsedMid.payload) {
            parsedMid.payload.resultType = constantsMID["resultType"][/** @type {keyof typeof constantsMID['resultType']} */(parsedMid.payload._resultType.toString())];
        }
        if ('_rundownAngleStatus' in parsedMid.payload) {
            parsedMid.payload.rundownAngleStatus = constantsMID["status"][/** @type {keyof typeof constantsMID['status']} */(parsedMid.payload._rundownAngleStatus.toString())];
        }
        if ('selftapMax' in parsedMid.payload) {
            parsedMid.payload.selftapMax /= 100;
        }
        if ('selftapMin' in parsedMid.payload) {
            parsedMid.payload.selftapMin /= 100;
        }
        if ('_selftapStatus' in parsedMid.payload) {
            parsedMid.payload.selftapStatus = constantsMID["status"][/** @type {keyof typeof constantsMID['status']} */(parsedMid.payload._selftapStatus.toString())];
        }
        if ('selftapTorque' in parsedMid.payload) {
            parsedMid.payload.selftapTorque /= 100;
        }
        if ('_strategy' in parsedMid.payload) {
            parsedMid.payload.strategy = constantsMID["strategy"][/** @type {keyof typeof constantsMID['strategy']} */ (parsedMid.payload._strategy.toString())];
        }
        if ('_strategyOptions' in parsedMid.payload) {
            parsedMid.payload.strategyOptions = checkBitMap("strategyOptions", parsedMid.payload._strategyOptions, 11);
        }
        if ('_tighteningErrorStatus' in parsedMid.payload) {
            parsedMid.payload.tighteningErrorStatus = checkBitMap("tighteningErrorStatus", parsedMid.payload._tighteningErrorStatus, 32);
        }
        if ('_tighteningErrorStatus2' in parsedMid.payload) {
            parsedMid.payload.tighteningErrorStatus2 = checkBitMap('tighteningErrorStatus2', parsedMid.payload._tighteningErrorStatus2, 32);
        }
        if ('_tighteningStatus' in parsedMid.payload) {
            parsedMid.payload.tighteningStatus = checkOK(parsedMid.payload._tighteningStatus);
        }
        if ('torque' in parsedMid.payload) {
            parsedMid.payload.torque /= 100;
        }
        if ('torqueFinalTarget' in parsedMid.payload) {
            parsedMid.payload.torqueFinalTarget /= 100;
        }
        if ('torqueMaxLimit' in parsedMid.payload) {
            parsedMid.payload.torqueMaxLimit /= 100;
        }
        if ('torqueMinLimit' in parsedMid.payload) {
            parsedMid.payload.torqueMinLimit /= 100;
        }
        if ('_torqueStatus' in parsedMid.payload) {
            parsedMid.payload.torqueStatus = constantsMID["status"][/** @type {keyof typeof constantsMID['status']} */(parsedMid.payload._torqueStatus.toString())];
        }
        if ('_torqueValuesUnit' in parsedMid.payload) {
            parsedMid.payload.torqueValuesUnit = constantsMID["torqueValuesUnit"][/** @type {keyof typeof constantsMID['torqueValuesUnit']} */(parsedMid.payload._torqueValuesUnit.toString())];
        }
        result = parsedMid;
    } catch (_err) {
        err = _err;
    }
    cb(err, result);
}

/**
 * @param {MID0061} msg 
 * @param {any} opts 
 * @param {(err: Error | null, msg?: import('../mid').EncodedMID) => void} cb
 */
function serializer(msg, opts, cb) {
    let result, err = null;
    try {
        if (msg.revision === 7) {
            // these are only present on rev 7
            msg.payload.compensatedAngle = Math.trunc(msg.payload.compensatedAngle * 100);
            msg.payload.finalAngleDecimal = Math.trunc(msg.payload.finalAngleDecimal * 100);
        }

        if ('angleStatus' in msg.payload) {
            msg.payload._angleStatus = serializerStatus(msg.payload.angleStatus);
        }
        if ('batchStatus' in msg.payload) {
            msg.payload._batchStatus = serializerStatus(msg.payload.batchStatus);
        }
        if ('currentMonitoringStatus' in msg.payload) {
            msg.payload._currentMonitoringStatus = serializerStatus(msg.payload.currentMonitoringStatus);
        }
        if ('prevailTorque' in msg.payload) {
            msg.payload.prevailTorque = Math.trunc(msg.payload.prevailTorque * 100);
        }
        if ('prevailTorqueCompensateStatus' in msg.payload) {
            msg.payload._prevailTorqueCompensateStatus = serializerStatus(msg.payload.prevailTorqueCompensateStatus);
        }
        if ('prevailTorqueCompensateValue' in msg.payload) {
            msg.payload.prevailTorqueCompensateValue = Math.trunc(msg.payload.prevailTorqueCompensateValue * 100);
        }
        if ('prevailTorqueMonitoringMax' in msg.payload) {
            msg.payload.prevailTorqueMonitoringMax = Math.trunc(msg.payload.prevailTorqueMonitoringMax * 100);
        }
        if ('prevailTorqueMonitoringMin' in msg.payload) {
            msg.payload.prevailTorqueMonitoringMin = Math.trunc(msg.payload.prevailTorqueMonitoringMin * 100);
        }
        if ('prevailTorqueMonitoringStatus' in msg.payload) {
            msg.payload._prevailTorqueMonitoringStatus = serializerStatus(msg.payload.prevailTorqueMonitoringStatus);
        }
        if ('resultType' in msg.payload) {
            msg.payload._resultType = serializerOptions("serializer-resultType", msg.payload.resultType);
        }
        if ('rundownAngleStatus' in msg.payload) {
            msg.payload._rundownAngleStatus = serializerStatus(msg.payload.rundownAngleStatus);
        }
        if ('selftapMax' in msg.payload) {
            msg.payload.selftapMax = Math.trunc(msg.payload.selftapMax * 100);
        }
        if ('selftapMin' in msg.payload) {
            msg.payload.selftapMin = Math.trunc(msg.payload.selftapMin * 100);
        }
        if ('selftapStatus' in msg.payload) {
            msg.payload._selftapStatus = serializerStatus(msg.payload.selftapStatus);
        }
        if ('selftapTorque' in msg.payload) {
            msg.payload.selftapTorque = Math.trunc(msg.payload.selftapTorque * 100);
        }
        if ('strategy' in msg.payload) {
            msg.payload._strategy = serializerOptions("serializer-strategy", msg.payload.strategy);
        }
        if ('strategyOptions' in msg.payload) {
            msg.payload._strategyOptions = serializerBitMap(msg.payload.strategyOptions, 10);
        }
        if ('tighteningErrorStatus' in msg.payload) {
            msg.payload._tighteningErrorStatus = serializerBitMap(msg.payload.tighteningErrorStatus, 32);
        }
        if ('tighteningErrorStatus2' in msg.payload) {
            msg.payload._tighteningErrorStatus2 = serializerBitMap(msg.payload.tighteningErrorStatus2, 32);
        }
        if ('tighteningStatus' in msg.payload) {
            msg.payload._tighteningStatus = serializerStatus(msg.payload.tighteningStatus);
        }
        if ('torque' in msg.payload) {
            msg.payload.torque = Math.trunc(msg.payload.torque * 100);
        }
        if ('torqueFinalTarget' in msg.payload) {
            msg.payload.torqueFinalTarget = Math.trunc(msg.payload.torqueFinalTarget * 100);
        }
        if ('torqueMaxLimit' in msg.payload) {
            msg.payload.torqueMaxLimit = Math.trunc(msg.payload.torqueMaxLimit * 100);
        }
        if ('torqueMinLimit' in msg.payload) {
            msg.payload.torqueMinLimit = Math.trunc(msg.payload.torqueMinLimit * 100);
        }
        if ('torqueStatus' in msg.payload) {
            msg.payload._torqueStatus = serializerStatus(msg.payload.torqueStatus);
        }
        if ('torqueValuesUnit' in msg.payload) {
            msg.payload._torqueValuesUnit = serializerOptions('serializer-torqueValuesUnit', msg.payload.torqueValuesUnit);
        }

        result = { ...msg, payload: helpers.serialize(msg, revisions) };
    } catch (_err) {
        err = _err;
    }
    cb(err, result);
}

/**
 * @param {string} type
 * @param {number} number
 * @param {number} length
 * @returns {(string|undefined)[]}
 */
function checkBitMap(type, number, length) {

    let retorno = new Array(length);

    for (let i = 0; i < length; i++) {

        if (((1 << i) & number) > 0) {
            // @ts-ignore
            retorno[i] = constantsMID[type][i];
        } else {
            retorno[i] = undefined;
        }

    }

    return retorno;
}

/**
 * @param {number} value 
 * @returns 
 */
function checkOK(value) {
    switch (value) {
        case 0:
            return "NOK";
        case 1:
            return "OK";
        default:
            return "NOT USED";
    }
}

/**
 * @param {string} value 
 * @returns {number}
 */
function serializerStatus(value) {

    if(typeof value !== "string"){
        return value;
    }
    
    value = value.toUpperCase();

    if ("OK" === value) {
        return 1;
    }

    if ("LOW" === value || "NOK" === value) {
        return 0;
    }

    if ("HIGH" === value || "NOT USED" === value) {
        return 2;
    }

    throw new Error(`unknown status value: ${value}`);
}

/**
 * 
 * @param {(string|undefined)[]|number} data 
 * @param {*} length 
 * @returns 
 */
function serializerBitMap(data, length){

    let retorno = 0;

    if(typeof data === 'number' && !isNaN(data)){
        return data;
    }

    if (typeof data === 'number') {
        throw new Error(`invalid value for bitmap: ${data}`);
    }

    for(let i = 0; i < length; i++){
        if(data[i]){
            retorno  |= 1 << i;
        }
    }

    return retorno;
}

/**
 * @param {string} type 
 * @param {number|string} data 
 * @returns 
 */
function serializerOptions(type, data){

    if(typeof data === 'number' && !isNaN(data)){
        return data;
    }

    // @ts-ignore
    return constantsMID[type][data];    
}

function revision() {
    return [7, 6, 5, 4, 3, 2, 1]; //MID 999 e 998 fora do auto revision
}

module.exports = {
    parser,
    serializer,
    revision
};
