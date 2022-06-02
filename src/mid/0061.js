//@ts-check
/*
  Copyright: (c) 2018-2020, Smart-Tech Controle e Automação
  GNU General Public License v3.0+ (see LICENSE or https://www.gnu.org/licenses/gpl-3.0.txt)
*/

const helpers = require("../helpers.js");
const processParser = helpers.processParser;
const processKey = helpers.processKey;
const serializerField = helpers.serializerField;
const serializerKey = helpers.serializerKey;

const rev1 = /** @type {const} */ ({
    mid: 61,
    revision: 1,
    fields: [
        { key: 1, type: 'num', len: 4, name: 'cellID' },
        { key: 2, type: 'num', len: 2, name: 'channelID' },
        { key: 3, type: 'str', len: 25, name: 'torqueControllerName' },
        { key: 4, type: 'rawStr', len: 25, name: 'numberVIN' },
        { key: 5, type: 'num', len: 2, name: 'jobID' },
        { key: 6, type: 'num', len: 3, name: 'parameterSetID' },
        { key: 7, type: 'num', len: 4, name: 'batchSize' },
        { key: 8, type: 'num', len: 4, name: 'batchCounter' },
        { key: 9, type: 'num', len: 1, name: 'tighteningStatus' },
        { key: 10, type: 'num', len: 1, name: 'torqueStatus' },
        { key: 11, type: 'num', len: 1, name: 'angleStatus' },
        { key: 12, type: 'num', len: 6, name: 'torqueMinLimit' },
        { key: 13, type: 'num', len: 6, name: 'torqueMaxLimit' },
        { key: 14, type: 'num', len: 6, name: 'torqueFinalTarget' },
        { key: 15, type: 'num', len: 6, name: 'torque' },
        { key: 16, type: 'num', len: 5, name: 'angleMin' },
        { key: 17, type: 'num', len: 5, name: 'angleMax' },
        { key: 18, type: 'num', len: 5, name: 'finalAngleTarget' },
        { key: 19, type: 'num', len: 5, name: 'angle' },
        { key: 20, type: 'str', len: 19, name: 'timeStamp' },
        { key: 21, type: 'str', len: 19, name: 'timeLastChange' },
        { key: 22, type: 'num', len: 1, name: 'batchStatus' },
        { key: 23, type: 'num', len: 10, name: 'tighteningID' },
    ]
});

const rev2 = /** @type {const} */ ({
    mid: 61,
    revision: 2,
    fields: [
        { key: 1, type: 'num', len: 4, name: 'cellID' },
        { key: 2, type: 'num', len: 2, name: 'channelID' },
        { key: 3, type: 'str', len: 25, name: 'torqueControllerName' },
        { key: 4, type: 'rawStr', len: 25, name: 'numberVIN' },
        { key: 5, type: 'num', len: 4, name: 'jobID' },
        { key: 6, type: 'num', len: 3, name: 'parameterSetID' },
        { key: 7, type: 'num', len: 2, name: 'strategy' },
        { key: 8, type: 'num', len: 5, name: 'strategyOptions' },
        { key: 9, type: 'num', len: 4, name: 'batchSize' },
        { key: 10, type: 'num', len: 4, name: 'batchCounter' },
        { key: 11, type: 'num', len: 1, name: 'tighteningStatus' },
        { key: 12, type: 'num', len: 1, name: 'batchStatus' },
        { key: 13, type: 'num', len: 1, name: 'torqueStatus' },
        { key: 14, type: 'num', len: 1, name: 'angleStatus' },
        { key: 15, type: 'num', len: 1, name: 'rundownAngleStatus' },
        { key: 16, type: 'num', len: 1, name: 'currentMonitoringStatus' },
        { key: 17, type: 'num', len: 1, name: 'selftapStatus' },
        { key: 18, type: 'num', len: 1, name: 'prevailTorqueMonitoringStatus' },
        { key: 19, type: 'num', len: 1, name: 'prevailTorqueCompensateStatus' },
        { key: 20, type: 'num', len: 10, name: 'tighteningErrorStatus' },
        { key: 21, type: 'num', len: 6, name: 'torqueMinLimit' },
        { key: 22, type: 'num', len: 6, name: 'torqueMaxLimit' },
        { key: 23, type: 'num', len: 6, name: 'torqueFinalTarget' },
        { key: 24, type: 'num', len: 6, name: 'torque' },
        { key: 25, type: 'num', len: 5, name: 'angleMin' },
        { key: 26, type: 'num', len: 5, name: 'angleMax' },
        { key: 27, type: 'num', len: 5, name: 'finalAngleTarget' },
        { key: 28, type: 'num', len: 5, name: 'angle' },
        { key: 29, type: 'num', len: 5, name: 'rundownAngleMin' },
        { key: 30, type: 'num', len: 5, name: 'rundownAngleMax' },
        { key: 31, type: 'num', len: 5, name: 'rundownAngle' },
        { key: 32, type: 'num', len: 3, name: 'currentMonitoringMin' },
        { key: 33, type: 'num', len: 3, name: 'currentMonitoringMax' },
        { key: 34, type: 'num', len: 3, name: 'currentMonitoringValue' },
        { key: 35, type: 'num', len: 6, name: 'selftapMin' },
        { key: 36, type: 'num', len: 6, name: 'selftapMax' },
        { key: 37, type: 'num', len: 6, name: 'selftapTorque' },
        { key: 38, type: 'num', len: 6, name: 'prevailTorqueMonitoringMin' },
        { key: 39, type: 'num', len: 6, name: 'prevailTorqueMonitoringMax' },
        { key: 40, type: 'num', len: 6, name: 'prevailTorque' },
        { key: 41, type: 'num', len: 10, name: 'tighteningID' },
        { key: 42, type: 'num', len: 5, name: 'jobSequenceNumber' },
        { key: 43, type: 'num', len: 5, name: 'syncTighteningID' },
        { key: 44, type: 'str', len: 14, name: 'toolSerialNumber' },
        { key: 45, type: 'str', len: 19, name: 'timeStamp' },
        { key: 46, type: 'str', len: 19, name: 'timeLastChange' },
    ],
});

const rev3 = /** @type {const} */ ({
    mid: 61,
    revision: 3,
    fields: [
        ...rev2.fields,
        { key: 47, type: 'str', len: 25, name: 'parameterSetName' },
        { key: 48, type: 'num', len: 1, name: 'torqueValuesUnit' },
        { key: 49, type: 'num', len: 2, name: 'resultType' },
    ],
});

const rev4 = /** @type {const} */ ({
    mid: 61,
    revision: 4,
    fields: [
        ...rev3.fields,
        { key: 50, type: 'str', len: 25, name: 'identifierPart2' },
        { key: 51, type: 'str', len: 25, name: 'identifierPart3' },
        { key: 52, type: 'str', len: 25, name: 'identifierPart4' },
    ],
});


const rev5 = /** @type {const} */ ({
    mid: 61,
    revision: 5,
    fields: [
        ...rev4.fields,
        { key: 53, type: 'string', len: 4, name: 'customerToghteningErrorCode' },
    ],
});

const rev6 = /** @type {const} */ ({
    mid: 61,
    revision: 6,
    fields: [
        ...rev5.fields,
        { key: 54, type: 'num', len: 6, name: 'prevailTorqueCompensateValue' },
        { key: 55, type: 'num', len: 10, name: 'tighteningErrorStatus2' },
        { key: null, type: 'num', len: 0, name: '_tighteningErrorStatus2' },
    ],
});

const rev7 = /** @type {const} */ ({
    mid: 61,
    revision: 7,
    fields: [
        ...rev6.fields,
        { key: 56, type: 'num', len: 7, name: 'compensatedAngle' },
        { key: 57, type: 'num', len: 7, name: 'finalAngleDecimal' },
    ],
});

const rev998 = /** @type {const} */ ({
    mid: 61,
    revision: 998,
    fields: [
        ...rev6.fields,
        { key: 56, type: 'num', len: 2, name: 'numberStagesMultiStage' },
        { key: 57, type: 'num', len: 2, name: 'numberStageResults' },
        { key: 58, type: 'str', len: null, name: 'stageResult' },
    ],
});

const rev999 = /** @type {const} */ ({
    mid: 61,
    revision: 999,
    fields: [
        { key: 1, keyl: null, type: 'rawStr', len: 25, name: 'numberVIN' },
        { key: 2, keyl: null, type: 'num', len: 2, name: 'jobID' },
        { key: 3, keyl: null, type: 'num', len: 3, name: 'parameterSetID' },
        { key: 4, keyl: null, type: 'num', len: 4, name: 'batchSize' },
        { key: 5, keyl: null, type: 'num', len: 4, name: 'batchCounter' },
        { key: 6, keyl: null, type: 'num', len: 1, name: 'batchStatus' },
        { key: null, keyl: null, type: 'num', len: null, name: '_batchStatus' },
        { key: 7, keyl: null, type: 'num', len: 1, name: 'tighteningStatus' },
        { key: null, keyl: null, type: 'num', len: null, name: '_tighteningStatus' },
        { key: 8, keyl: null, type: 'num', len: 1, name: 'torqueStatus' },
        { key: null, keyl: null, type: 'num', len: null, name: '_torqueStatus' },
        { key: 9, keyl: null, type: 'num', len: 1, name: 'angleStatus' },
        { key: null, keyl: null, type: 'num', len: null, name: '_angleStatus' },
        { key: 10, keyl: null, type: 'num', len: 6, name: 'torque' },
        { key: 11, keyl: null, type: 'num', len: 5, name: 'angle' },
        { key: 12, keyl: null, type: 'str', len: 19, name: 'timeStamp' },
        { key: 13, keyl: null, type: 'str', len: 19, name: 'timeLastChange' },
        { key: 14, keyl: null, type: 'num', len: 10, name: 'tighteningID' },
    ]
});


/**
 * @template MRS
 * @typedef {import("../helpers").MidTypeFromStruct<MRS>} MidTypeFromStruct<MRS>
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

const constantsMID = require("./MidConstants/MID0061");

/**
 * @param {import('../helpers').EncodedMID} msg 
 * @param {any} opts
 * @param {(err: Error | null, msg?: MID0061) => void} cb 
 */
function parser(msg, opts, cb) {

    let buffer = msg.payload;
    msg.payload = {};

    let status = true;

    let position = {
        value: 0
    };

    let revision = msg.revision || 1;

    switch (revision) {

        case 998:

            position = {
                value: 506
            };

            status =
                processKey(msg, buffer, "numberStagesMultiStage", 56, 2, position, cb) &&
                processParser(msg, buffer, "numberStagesMultiStage", "number", 2, position, cb) &&
                processKey(msg, buffer, "numberStageResults", 57, 2, position, cb) &&
                processParser(msg, buffer, "numberStageResults", "number", 2, position, cb) &&
                processKey(msg, buffer, "stageResult", 58, 2, position, cb) &&
                processParser(msg, buffer, "stageResult", "string", (11 * msg.payload.numberStageResults), position, cb);

            revision = 6;

            break;

        case 7:

            position = {
                value: 506
            };

            status =
                processKey(msg, buffer, "compensatedAngle", 56, 2, position, cb) &&
                processParser(msg, buffer, "compensatedAngle", "number", 7, position, cb) &&
                processKey(msg, buffer, "finalAngleDecimal", 57, 2, position, cb) &&
                processParser(msg, buffer, "finalAngleDecimal", "number", 7, position, cb);

            if (status) {
                msg.payload.compensatedAngle = (msg.payload.compensatedAngle / 100);
                msg.payload.finalAngleDecimal = (msg.payload.finalAngleDecimal / 100);
                revision = 6;
            }

            break;
    }

    switch (revision) {

        case 999:

            position = {
                value: 0
            };

            status =
                processParser(msg, buffer, "numberVIN", "rawString", 25, position, cb) &&
                processParser(msg, buffer, "jobID", "number", 2, position, cb) &&
                processParser(msg, buffer, "parameterSetID", "number", 3, position, cb) &&
                processParser(msg, buffer, "batchSize", "number", 4, position, cb) &&
                processParser(msg, buffer, "batchCounter", "number", 4, position, cb) &&
                processParser(msg, buffer, "batchStatus", "number", 1, position, cb) &&
                processParser(msg, buffer, "tighteningStatus", "number", 1, position, cb) &&
                processParser(msg, buffer, "torqueStatus", "number", 1, position, cb) &&
                processParser(msg, buffer, "angleStatus", "number", 1, position, cb) &&
                processParser(msg, buffer, "torque", "number", 6, position, cb) &&
                processParser(msg, buffer, "angle", "number", 5, position, cb) &&
                processParser(msg, buffer, "timeStamp", "string", 19, position, cb) &&
                processParser(msg, buffer, "timeLastChange", "string", 19, position, cb) &&
                processParser(msg, buffer, "tighteningID", "number", 10, position, cb);

            if (status) {
                msg.payload._torqueStatus = msg.payload.torqueStatus;
                msg.payload.torqueStatus = constantsMID["status"][msg.payload.torqueStatus.toString()];

                msg.payload._angleStatus = msg.payload.angleStatus;
                msg.payload.angleStatus = constantsMID["status"][msg.payload.angleStatus.toString()];

                msg.payload.torque = (msg.payload.torque / 100);

                msg.payload._tighteningStatus = msg.payload.tighteningStatus;
                msg.payload.tighteningStatus = checkOK(msg.payload.tighteningStatus);

                msg.payload._batchStatus = msg.payload.batchStatus;
                msg.payload.batchStatus = checkOK(msg.payload.batchStatus);

                cb(null, msg);
            }

            break;

        case 6:

            position = {
                value: 486
            };

            status =
                processKey(msg, buffer, "prevailTorqueCompensateValue", 54, 2, position, cb) &&
                processParser(msg, buffer, "prevailTorqueCompensateValue", "number", 6, position, cb) &&
                processKey(msg, buffer, "tighteningErrorStatus2", 55, 2, position, cb) &&
                processParser(msg, buffer, "tighteningErrorStatus2", "number", 10, position, cb);

            if (status) {
                msg.payload._tighteningErrorStatus2 = msg.payload.tighteningErrorStatus2;
                msg.payload.tighteningErrorStatus2 = checkBitMap("tighteningErrorStatus2", msg.payload.tighteningErrorStatus2, 32);
                msg.payload.prevailTorqueCompensateValue = (msg.payload.prevailTorqueCompensateValue / 100);
            }

        case 5:

            position = {
                value: 480
            };

            status =
                processKey(msg, buffer, "customerToghteningErrorCode", 53, 2, position, cb) &&
                processParser(msg, buffer, "customerToghteningErrorCode", "string", 4, position, cb);

        case 4:

            position = {
                value: 399
            };

            status =
                processKey(msg, buffer, "identifierPart2", 50, 2, position, cb) &&
                processParser(msg, buffer, "identifierPart2", "string", 25, position, cb) &&
                processKey(msg, buffer, "identifierPart3", 51, 2, position, cb) &&
                processParser(msg, buffer, "identifierPart3", "string", 25, position, cb) &&
                processKey(msg, buffer, "identifierPart4", 52, 2, position, cb) &&
                processParser(msg, buffer, "identifierPart4", "string", 25, position, cb);


        case 3:

            position = {
                value: 365
            };

            status =
                processKey(msg, buffer, "parameterSetName", 47, 2, position, cb) &&
                processParser(msg, buffer, "parameterSetName", "string", 25, position, cb) &&
                processKey(msg, buffer, "torqueValuesUnit", 48, 2, position, cb) &&
                processParser(msg, buffer, "torqueValuesUnit", "number", 1, position, cb) &&
                processKey(msg, buffer, "resultType", 49, 2, position, cb) &&
                processParser(msg, buffer, "resultType", "number", 2, position, cb);

            if (status) {

                msg.payload._torqueValuesUnit = msg.payload.torqueValuesUnit;
                msg.payload.torqueValuesUnit = constantsMID["torqueValuesUnit"][msg.payload.torqueValuesUnit.toString()];

                msg.payload._resultType = msg.payload.resultType;
                msg.payload.resultType = constantsMID["resultType"][msg.payload.resultType.toString()];

            }


        case 2:

            position = {
                value: 0
            };

            status =
                processKey(msg, buffer, "cellID", 1, 2, position, cb) &&
                processParser(msg, buffer, "cellID", "number", 4, position, cb) &&
                processKey(msg, buffer, "channelID", 2, 2, position, cb) &&
                processParser(msg, buffer, "channelID", "number", 2, position, cb) &&
                processKey(msg, buffer, "torqueControllerName", 3, 2, position, cb) &&
                processParser(msg, buffer, "torqueControllerName", "string", 25, position, cb) &&
                processKey(msg, buffer, "numberVIN", 4, 2, position, cb) &&
                processParser(msg, buffer, "numberVIN", "rawString", 25, position, cb) &&
                processKey(msg, buffer, "jobID", 5, 2, position, cb) &&
                processParser(msg, buffer, "jobID", "number", 4, position, cb) &&
                processKey(msg, buffer, "parameterSetID", 6, 2, position, cb) &&
                processParser(msg, buffer, "parameterSetID", "number", 3, position, cb) &&
                processKey(msg, buffer, "strategy", 7, 2, position, cb) &&
                processParser(msg, buffer, "strategy", "number", 2, position, cb) &&
                processKey(msg, buffer, "strategyOptions", 8, 2, position, cb) &&
                processParser(msg, buffer, "strategyOptions", "number", 5, position, cb) &&
                processKey(msg, buffer, "batchSize", 9, 2, position, cb) &&
                processParser(msg, buffer, "batchSize", "number", 4, position, cb) &&
                processKey(msg, buffer, "batchCounter", 10, 2, position, cb) &&
                processParser(msg, buffer, "batchCounter", "number", 4, position, cb) &&
                processKey(msg, buffer, "tighteningStatus", 11, 2, position, cb) &&
                processParser(msg, buffer, "tighteningStatus", "number", 1, position, cb) &&
                processKey(msg, buffer, "batchStatus", 12, 2, position, cb) &&
                processParser(msg, buffer, "batchStatus", "number", 1, position, cb) &&
                processKey(msg, buffer, "torqueStatus", 13, 2, position, cb) &&
                processParser(msg, buffer, "torqueStatus", "number", 1, position, cb) &&
                processKey(msg, buffer, "angleStatus", 14, 2, position, cb) &&
                processParser(msg, buffer, "angleStatus", "number", 1, position, cb) &&
                processKey(msg, buffer, "rundownAngleStatus", 15, 2, position, cb) &&
                processParser(msg, buffer, "rundownAngleStatus", "number", 1, position, cb) &&
                processKey(msg, buffer, "currentMonitoringStatus", 16, 2, position, cb) &&
                processParser(msg, buffer, "currentMonitoringStatus", "number", 1, position, cb) &&
                processKey(msg, buffer, "selftapStatus", 17, 2, position, cb) &&
                processParser(msg, buffer, "selftapStatus", "number", 1, position, cb) &&
                processKey(msg, buffer, "prevailTorqueMonitoringStatus", 18, 2, position, cb) &&
                processParser(msg, buffer, "prevailTorqueMonitoringStatus", "number", 1, position, cb) &&
                processKey(msg, buffer, "prevailTorqueCompensateStatus", 19, 2, position, cb) &&
                processParser(msg, buffer, "prevailTorqueCompensateStatus", "number", 1, position, cb) &&
                processKey(msg, buffer, "tighteningErrorStatus", 20, 2, position, cb) &&
                processParser(msg, buffer, "tighteningErrorStatus", "number", 10, position, cb) &&
                processKey(msg, buffer, "torqueMinLimit", 21, 2, position, cb) &&
                processParser(msg, buffer, "torqueMinLimit", "number", 6, position, cb) &&
                processKey(msg, buffer, "torqueMaxLimit", 22, 2, position, cb) &&
                processParser(msg, buffer, "torqueMaxLimit", "number", 6, position, cb) &&
                processKey(msg, buffer, "torqueFinalTarget", 23, 2, position, cb) &&
                processParser(msg, buffer, "torqueFinalTarget", "number", 6, position, cb) &&
                processKey(msg, buffer, "torque", 24, 2, position, cb) &&
                processParser(msg, buffer, "torque", "number", 6, position, cb) &&
                processKey(msg, buffer, "angleMin", 25, 2, position, cb) &&
                processParser(msg, buffer, "angleMin", "number", 5, position, cb) &&
                processKey(msg, buffer, "angleMax", 26, 2, position, cb) &&
                processParser(msg, buffer, "angleMax", "number", 5, position, cb) &&
                processKey(msg, buffer, "finalAngleTarget", 27, 2, position, cb) &&
                processParser(msg, buffer, "finalAngleTarget", "number", 5, position, cb) &&
                processKey(msg, buffer, "angle", 28, 2, position, cb) &&
                processParser(msg, buffer, "angle", "number", 5, position, cb) &&
                processKey(msg, buffer, "rundownAngleMin", 29, 2, position, cb) &&
                processParser(msg, buffer, "rundownAngleMin", "number", 5, position, cb) &&
                processKey(msg, buffer, "rundownAngleMax", 30, 2, position, cb) &&
                processParser(msg, buffer, "rundownAngleMax", "number", 5, position, cb) &&
                processKey(msg, buffer, "rundownAngle", 31, 2, position, cb) &&
                processParser(msg, buffer, "rundownAngle", "number", 5, position, cb) &&
                processKey(msg, buffer, "currentMonitoringMin", 32, 2, position, cb) &&
                processParser(msg, buffer, "currentMonitoringMin", "number", 3, position, cb) &&
                processKey(msg, buffer, "currentMonitoringMax", 33, 2, position, cb) &&
                processParser(msg, buffer, "currentMonitoringMax", "number", 3, position, cb) &&
                processKey(msg, buffer, "currentMonitoringValue", 34, 2, position, cb) &&
                processParser(msg, buffer, "currentMonitoringValue", "number", 3, position, cb) &&
                processKey(msg, buffer, "selftapMin", 35, 2, position, cb) &&
                processParser(msg, buffer, "selftapMin", "number", 6, position, cb) &&
                processKey(msg, buffer, "selftapMax", 36, 2, position, cb) &&
                processParser(msg, buffer, "selftapMax", "number", 6, position, cb) &&
                processKey(msg, buffer, "selftapTorque", 37, 2, position, cb) &&
                processParser(msg, buffer, "selftapTorque", "number", 6, position, cb) &&
                processKey(msg, buffer, "prevailTorqueMonitoringMin", 38, 2, position, cb) &&
                processParser(msg, buffer, "prevailTorqueMonitoringMin", "number", 6, position, cb) &&
                processKey(msg, buffer, "prevailTorqueMonitoringMax", 39, 2, position, cb) &&
                processParser(msg, buffer, "prevailTorqueMonitoringMax", "number", 6, position, cb) &&
                processKey(msg, buffer, "prevailTorque", 40, 2, position, cb) &&
                processParser(msg, buffer, "prevailTorque", "number", 6, position, cb) &&
                processKey(msg, buffer, "tighteningID", 41, 2, position, cb) &&
                processParser(msg, buffer, "tighteningID", "number", 10, position, cb) &&
                processKey(msg, buffer, "jobSequenceNumber", 42, 2, position, cb) &&
                processParser(msg, buffer, "jobSequenceNumber", "number", 5, position, cb) &&
                processKey(msg, buffer, "syncTighteningID", 43, 2, position, cb) &&
                processParser(msg, buffer, "syncTighteningID", "number", 5, position, cb) &&
                processKey(msg, buffer, "toolSerialNumber", 44, 2, position, cb) &&
                processParser(msg, buffer, "toolSerialNumber", "string", 14, position, cb) &&
                processKey(msg, buffer, "timeStamp", 45, 2, position, cb) &&
                processParser(msg, buffer, "timeStamp", "string", 19, position, cb) &&
                processKey(msg, buffer, "timeLastChange", 46, 2, position, cb) &&
                processParser(msg, buffer, "timeLastChange", "string", 19, position, cb);

            if (status) {
                msg.payload._strategy = msg.payload.strategy;
                msg.payload.strategy = constantsMID["strategy"][msg.payload.strategy.toString()];

                msg.payload._strategyOptions = msg.payload.strategyOptions;
                msg.payload.strategyOptions = checkBitMap("strategyOptions", msg.payload.strategyOptions, 11);

                msg.payload._torqueStatus = msg.payload.torqueStatus;
                msg.payload.torqueStatus = constantsMID["status"][msg.payload.torqueStatus.toString()];

                msg.payload._angleStatus = msg.payload.angleStatus;
                msg.payload.angleStatus = constantsMID["status"][msg.payload.angleStatus.toString()];

                msg.payload._rundownAngleStatus = msg.payload.rundownAngleStatus;
                msg.payload.rundownAngleStatus = constantsMID["status"][msg.payload.rundownAngleStatus.toString()];

                msg.payload._currentMonitoringStatus = msg.payload.currentMonitoringStatus;
                msg.payload.currentMonitoringStatus = constantsMID["status"][msg.payload.currentMonitoringStatus.toString()];

                msg.payload._selftapStatus = msg.payload.selftapStatus;
                msg.payload.selftapStatus = constantsMID["status"][msg.payload.selftapStatus.toString()];

                msg.payload._prevailTorqueMonitoringStatus = msg.payload.prevailTorqueMonitoringStatus;
                msg.payload.prevailTorqueMonitoringStatus = constantsMID["status"][msg.payload.prevailTorqueMonitoringStatus.toString()];

                msg.payload._prevailTorqueCompensateStatus = msg.payload.prevailTorqueCompensateStatus;
                msg.payload.prevailTorqueCompensateStatus = constantsMID["status"][msg.payload.prevailTorqueCompensateStatus.toString()];

                msg.payload._tighteningErrorStatus = msg.payload.tighteningErrorStatus;
                msg.payload.tighteningErrorStatus = checkBitMap("tighteningErrorStatus", msg.payload.tighteningErrorStatus, 32);

                msg.payload.torqueMinLimit = (msg.payload.torqueMinLimit / 100);

                msg.payload.torqueMaxLimit = (msg.payload.torqueMaxLimit / 100);

                msg.payload.torqueFinalTarget = (msg.payload.torqueFinalTarget / 100);

                msg.payload.torque = (msg.payload.torque / 100);

                msg.payload.selftapMin = (msg.payload.selftapMin / 100);

                msg.payload.selftapMax = (msg.payload.selftapMax / 100);

                msg.payload.selftapTorque = (msg.payload.selftapTorque / 100);

                msg.payload.prevailTorqueMonitoringMin = (msg.payload.prevailTorqueMonitoringMin / 100);

                msg.payload.prevailTorqueMonitoringMax = (msg.payload.prevailTorqueMonitoringMax / 100);

                msg.payload.prevailTorque = (msg.payload.prevailTorque / 100);

                msg.payload._tighteningStatus = msg.payload.tighteningStatus;
                msg.payload.tighteningStatus = checkOK(msg.payload.tighteningStatus);

                msg.payload._batchStatus = msg.payload.batchStatus;
                msg.payload.batchStatus = checkOK(msg.payload.batchStatus);

                cb(null, msg);
            }
            break;

        case 1:

            position = {
                value: 0
            };

            status =
                processKey(msg, buffer, "cellID", 1, 2, position, cb) &&
                processParser(msg, buffer, "cellID", "number", 4, position, cb) &&
                processKey(msg, buffer, "channelID", 2, 2, position, cb) &&
                processParser(msg, buffer, "channelID", "number", 2, position, cb) &&
                processKey(msg, buffer, "torqueControllerName", 3, 2, position, cb) &&
                processParser(msg, buffer, "torqueControllerName", "string", 25, position, cb) &&
                processKey(msg, buffer, "numberVIN", 4, 2, position, cb) &&
                processParser(msg, buffer, "numberVIN", "rawString", 25, position, cb) &&
                processKey(msg, buffer, "jobID", 5, 2, position, cb) &&
                processParser(msg, buffer, "jobID", "number", 2, position, cb) &&
                processKey(msg, buffer, "parameterSetID", 6, 2, position, cb) &&
                processParser(msg, buffer, "parameterSetID", "number", 3, position, cb) &&
                processKey(msg, buffer, "batchSize", 7, 2, position, cb) &&
                processParser(msg, buffer, "batchSize", "number", 4, position, cb) &&
                processKey(msg, buffer, "batchCounter", 8, 2, position, cb) &&
                processParser(msg, buffer, "batchCounter", "number", 4, position, cb) &&
                processKey(msg, buffer, "tighteningStatus", 9, 2, position, cb) &&
                processParser(msg, buffer, "tighteningStatus", "number", 1, position, cb) &&
                processKey(msg, buffer, "torqueStatus", 10, 2, position, cb) &&
                processParser(msg, buffer, "torqueStatus", "number", 1, position, cb) &&
                processKey(msg, buffer, "angleStatus", 11, 2, position, cb) &&
                processParser(msg, buffer, "angleStatus", "number", 1, position, cb) &&
                processKey(msg, buffer, "torqueMinLimit", 12, 2, position, cb) &&
                processParser(msg, buffer, "torqueMinLimit", "number", 6, position, cb) &&
                processKey(msg, buffer, "torqueMaxLimit", 13, 2, position, cb) &&
                processParser(msg, buffer, "torqueMaxLimit", "number", 6, position, cb) &&
                processKey(msg, buffer, "torqueFinalTarget", 14, 2, position, cb) &&
                processParser(msg, buffer, "torqueFinalTarget", "number", 6, position, cb) &&
                processKey(msg, buffer, "torque", 15, 2, position, cb) &&
                processParser(msg, buffer, "torque", "number", 6, position, cb) &&
                processKey(msg, buffer, "angleMin", 16, 2, position, cb) &&
                processParser(msg, buffer, "angleMin", "number", 5, position, cb) &&
                processKey(msg, buffer, "angleMax", 17, 2, position, cb) &&
                processParser(msg, buffer, "angleMax", "number", 5, position, cb) &&
                processKey(msg, buffer, "finalAngleTarget", 18, 2, position, cb) &&
                processParser(msg, buffer, "finalAngleTarget", "number", 5, position, cb) &&
                processKey(msg, buffer, "angle", 19, 2, position, cb) &&
                processParser(msg, buffer, "angle", "number", 5, position, cb) &&
                processKey(msg, buffer, "timeStamp", 20, 2, position, cb) &&
                processParser(msg, buffer, "timeStamp", "string", 19, position, cb) &&
                processKey(msg, buffer, "timeLastChange", 21, 2, position, cb) &&
                processParser(msg, buffer, "timeLastChange", "string", 19, position, cb) &&
                processKey(msg, buffer, "batchStatus", 22, 2, position, cb) &&
                processParser(msg, buffer, "batchStatus", "number", 1, position, cb) &&
                processKey(msg, buffer, "tighteningID", 23, 2, position, cb) &&
                processParser(msg, buffer, "tighteningID", "number", 10, position, cb);

            if (status) {

                msg.payload._torqueStatus = msg.payload.torqueStatus;
                msg.payload.torqueStatus = constantsMID["status"][msg.payload.torqueStatus.toString()];

                msg.payload._angleStatus = msg.payload.angleStatus;
                msg.payload.angleStatus = constantsMID["status"][msg.payload.angleStatus.toString()];

                msg.payload.torqueMinLimit = (msg.payload.torqueMinLimit / 100);

                msg.payload.torqueMaxLimit = (msg.payload.torqueMaxLimit / 100);

                msg.payload.torqueFinalTarget = (msg.payload.torqueFinalTarget / 100);

                msg.payload.torque = (msg.payload.torque / 100);

                msg.payload._tighteningStatus = msg.payload.tighteningStatus;
                msg.payload.tighteningStatus = checkOK(msg.payload.tighteningStatus);

                msg.payload._batchStatus = msg.payload.batchStatus;
                msg.payload.batchStatus = checkOK(msg.payload.batchStatus);

                cb(null, msg);
            }

            break;

        default:
            cb(new Error(`[Parser MID${msg.mid}] invalid revision [${msg.revision}]`));
            break;

    }
}

/**
 * @param {MID0061} msg 
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
    let revision = msg.revision;

    switch (revision) {
        case 7:

            buf = Buffer.alloc(524);

            position.value = 524;

            msg.payload.finalAngleDecimal = Math.trunc((msg.payload.finalAngleDecimal * 100));
            msg.payload.compensatedAngle = Math.trunc((msg.payload.compensatedAngle * 100));

            statusprocess =
                serializerField(msg, buf, "finalAngleDecimal", "number", 7, position, cb) &&
                serializerKey(msg, buf, 57, 2, position, cb) &&
                serializerField(msg, buf, "compensatedAngle", "number", 7, position, cb) &&
                serializerKey(msg, buf, 56, 2, position, cb);

            revision = 6;

            break;

        case 998:

            buf = Buffer.alloc(527);

            position.value = 527;

            statusprocess =
                serializerField(msg, buf, "stageResult", "string", (11 * msg.payload.numberStageResults), position, cb) &&
                serializerKey(msg, buf, 58, 2, position, cb) &&
                serializerField(msg, buf, "numberStageResults", "number", 2, position, cb) &&
                serializerKey(msg, buf, 57, 2, position, cb) &&
                serializerField(msg, buf, "numberStagesMultiStage", "number", 2, position, cb) &&
                serializerKey(msg, buf, 56, 2, position, cb);

            revision = 6;

            break;

        case 999:

            buf = Buffer.alloc(101);

            position.value = 101;

            msg.payload.tighteningStatus = serializerStatus(msg.payload.tighteningStatus);
            msg.payload.torqueStatus = serializerStatus(msg.payload.torqueStatus);
            msg.payload.angleStatus = serializerStatus(msg.payload.angleStatus);
            msg.payload.batchStatus = serializerStatus(msg.payload.batchStatus);

            msg.payload.torque = Math.trunc((msg.payload.torque * 100));

            statusprocess =
                serializerField(msg, buf, "tighteningID", "number", 10, position, cb) &&
                serializerField(msg, buf, "timeLastChange", "string", 19, position, cb) &&
                serializerField(msg, buf, "timeStamp", "string", 19, position, cb) &&
                serializerField(msg, buf, "angle", "number", 5, position, cb) &&
                serializerField(msg, buf, "torque", "number", 6, position, cb) &&
                serializerField(msg, buf, "angleStatus", "number", 1, position, cb) &&
                serializerField(msg, buf, "torqueStatus", "number", 1, position, cb) &&
                serializerField(msg, buf, "tighteningStatus", "number", 1, position, cb) &&
                serializerField(msg, buf, "batchStatus", "number", 1, position, cb) &&
                serializerField(msg, buf, "batchCounter", "number", 4, position, cb) &&
                serializerField(msg, buf, "batchSize", "number", 4, position, cb) &&
                serializerField(msg, buf, "parameterSetID", "number", 3, position, cb) &&
                serializerField(msg, buf, "jobID", "number", 2, position, cb) &&
                serializerField(msg, buf, "numberVIN", "rawString", 25, position, cb);

            if (!statusprocess) {
                return;
            }

            msg.payload = buf;

            cb(null, msg);

            break;
    }

    switch (revision) {

        case 999:
            break;

        case 6:

            if (buf === undefined) {
                buf = Buffer.alloc(506);
                position.value = 506;
                statusprocess = true;
            }

            if (!statusprocess) {
                return;
            }

            msg.payload.tighteningErrorStatus2 = serializerBitMap(msg.payload.tighteningErrorStatus2, 32);
            msg.payload.prevailTorqueCompensateValue = Math.trunc(msg.payload.prevailTorqueCompensateValue * 100);

            statusprocess =
                serializerField(msg, buf, "tighteningErrorStatus2", "number", 10, position, cb) &&
                serializerKey(msg, buf, 55, 2, position, cb) &&
                serializerField(msg, buf, "prevailTorqueCompensateValue", "number", 6, position, cb) &&
                serializerKey(msg, buf, 54, 2, position, cb);

        case 5:

            if (buf === undefined) {
                buf = Buffer.alloc(486);
                position.value = 486;
                statusprocess = true;
            }

            if (!statusprocess) {
                return;
            }

            statusprocess =
                serializerField(msg, buf, "customerToghteningErrorCode", "string", 4, position, cb) &&
                serializerKey(msg, buf, 53, 2, position, cb);


        case 4:

            if (buf === undefined) {
                buf = Buffer.alloc(480);
                position.value = 480;
                statusprocess = true;
            }

            if (!statusprocess) {
                return;
            }

            statusprocess =
                serializerField(msg, buf, "identifierPart4", "string", 25, position, cb) &&
                serializerKey(msg, buf, 52, 2, position, cb) &&
                serializerField(msg, buf, "identifierPart3", "string", 25, position, cb) &&
                serializerKey(msg, buf, 51, 2, position, cb) &&
                serializerField(msg, buf, "identifierPart2", "string", 25, position, cb) &&
                serializerKey(msg, buf, 50, 2, position, cb);

        case 3:

            if (buf === undefined) {
                buf = Buffer.alloc(399);
                position.value = 399;
                statusprocess = true;
            }

            if (!statusprocess) {
                return;
            }

            msg.payload.torqueValuesUnit = serializerOptions("serializer-torqueValuesUnit", msg.payload.torqueValuesUnit);
            msg.payload.resultType = serializerOptions("serializer-resultType", msg.payload.resultType);

            statusprocess =
                serializerField(msg, buf, "resultType", "number", 2, position, cb) &&
                serializerKey(msg, buf, 49, 2, position, cb) &&
                serializerField(msg, buf, "torqueValuesUnit", "number", 1, position, cb) &&
                serializerKey(msg, buf, 48, 2, position, cb) &&
                serializerField(msg, buf, "parameterSetName", "string", 25, position, cb) &&
                serializerKey(msg, buf, 47, 2, position, cb);
        case 2:

            if (buf === undefined) {
                buf = Buffer.alloc(365);
                position.value = 365;
                statusprocess = true;
            }

            if (!statusprocess) {
                return;
            }

            msg.payload.prevailTorque = Math.trunc(msg.payload.prevailTorque * 100);
            msg.payload.prevailTorqueMonitoringMax = Math.trunc(msg.payload.prevailTorqueMonitoringMax * 100);
            msg.payload.prevailTorqueMonitoringMin = Math.trunc(msg.payload.prevailTorqueMonitoringMin * 100);
            msg.payload.selftapTorque = Math.trunc(msg.payload.selftapTorque * 100);
            msg.payload.selftapMax = Math.trunc(msg.payload.selftapMax * 100);
            msg.payload.selftapMin = Math.trunc(msg.payload.selftapMin * 100);
            msg.payload.torque = Math.trunc(msg.payload.torque * 100);
            msg.payload.torqueFinalTarget = Math.trunc(msg.payload.torqueFinalTarget * 100);
            msg.payload.torqueMaxLimit = Math.trunc(msg.payload.torqueMaxLimit * 100);
            msg.payload.torqueMinLimit = Math.trunc(msg.payload.torqueMinLimit * 100);

            msg.payload.tighteningErrorStatus = serializerBitMap(msg.payload.tighteningErrorStatus, 32);
            msg.payload.strategyOptions = serializerBitMap(msg.payload.strategyOptions, 10);

            msg.payload.prevailTorqueCompensateStatus = serializerStatus(msg.payload.prevailTorqueCompensateStatus);
            msg.payload.prevailTorqueMonitoringStatus = serializerStatus(msg.payload.prevailTorqueMonitoringStatus);
            msg.payload.selftapStatus = serializerStatus(msg.payload.selftapStatus);
            msg.payload.currentMonitoringStatus = serializerStatus(msg.payload.currentMonitoringStatus);
            msg.payload.rundownAngleStatus = serializerStatus(msg.payload.rundownAngleStatus);
            msg.payload.angleStatus = serializerStatus(msg.payload.angleStatus);
            msg.payload.torqueStatus = serializerStatus(msg.payload.torqueStatus);
            msg.payload.batchStatus = serializerStatus(msg.payload.batchStatus);
            msg.payload.tighteningStatus = serializerStatus(msg.payload.tighteningStatus);

            msg.payload.strategy = serializerOptions("serializer-strategy", msg.payload.strategy);

            statusprocess =
                serializerField(msg, buf, "timeLastChange", "string", 19, position, cb) &&
                serializerKey(msg, buf, 46, 2, position, cb) &&
                serializerField(msg, buf, "timeStamp", "string", 19, position, cb) &&
                serializerKey(msg, buf, 45, 2, position, cb) &&
                serializerField(msg, buf, "toolSerialNumber", "string", 14, position, cb) &&
                serializerKey(msg, buf, 44, 2, position, cb) &&
                serializerField(msg, buf, "syncTighteningID", "number", 5, position, cb) &&
                serializerKey(msg, buf, 43, 2, position, cb) &&
                serializerField(msg, buf, "jobSequenceNumber", "number", 5, position, cb) &&
                serializerKey(msg, buf, 42, 2, position, cb) &&
                serializerField(msg, buf, "tighteningID", "number", 10, position, cb) &&
                serializerKey(msg, buf, 41, 2, position, cb) &&
                serializerField(msg, buf, "prevailTorque", "number", 6, position, cb) &&
                serializerKey(msg, buf, 40, 2, position, cb) &&
                serializerField(msg, buf, "prevailTorqueMonitoringMax", "number", 6, position, cb) &&
                serializerKey(msg, buf, 39, 2, position, cb) &&
                serializerField(msg, buf, "prevailTorqueMonitoringMin", "number", 6, position, cb) &&
                serializerKey(msg, buf, 38, 2, position, cb) &&
                serializerField(msg, buf, "selftapTorque", "number", 6, position, cb) &&
                serializerKey(msg, buf, 37, 2, position, cb) &&
                serializerField(msg, buf, "selftapMax", "number", 6, position, cb) &&
                serializerKey(msg, buf, 36, 2, position, cb) &&
                serializerField(msg, buf, "selftapMin", "number", 6, position, cb) &&
                serializerKey(msg, buf, 35, 2, position, cb) &&
                serializerField(msg, buf, "currentMonitoringValue", "number", 3, position, cb) &&
                serializerKey(msg, buf, 34, 2, position, cb) &&
                serializerField(msg, buf, "currentMonitoringMax", "number", 3, position, cb) &&
                serializerKey(msg, buf, 33, 2, position, cb) &&
                serializerField(msg, buf, "currentMonitoringMin", "number", 3, position, cb) &&
                serializerKey(msg, buf, 32, 2, position, cb) &&
                serializerField(msg, buf, "rundownAngle", "number", 5, position, cb) &&
                serializerKey(msg, buf, 31, 2, position, cb) &&
                serializerField(msg, buf, "rundownAngleMax", "number", 5, position, cb) &&
                serializerKey(msg, buf, 30, 2, position, cb) &&
                serializerField(msg, buf, "rundownAngleMin", "number", 5, position, cb) &&
                serializerKey(msg, buf, 29, 2, position, cb) &&
                serializerField(msg, buf, "angle", "number", 5, position, cb) &&
                serializerKey(msg, buf, 28, 2, position, cb) &&
                serializerField(msg, buf, "finalAngleTarget", "number", 5, position, cb) &&
                serializerKey(msg, buf, 27, 2, position, cb) &&
                serializerField(msg, buf, "angleMax", "number", 5, position, cb) &&
                serializerKey(msg, buf, 26, 2, position, cb) &&
                serializerField(msg, buf, "angleMin", "number", 5, position, cb) &&
                serializerKey(msg, buf, 25, 2, position, cb) &&
                serializerField(msg, buf, "torque", "number", 6, position, cb) &&
                serializerKey(msg, buf, 24, 2, position, cb) &&
                serializerField(msg, buf, "torqueFinalTarget", "number", 6, position, cb) &&
                serializerKey(msg, buf, 23, 2, position, cb) &&
                serializerField(msg, buf, "torqueMaxLimit", "number", 6, position, cb) &&
                serializerKey(msg, buf, 22, 2, position, cb) &&
                serializerField(msg, buf, "torqueMinLimit", "number", 6, position, cb) &&
                serializerKey(msg, buf, 21, 2, position, cb) &&
                serializerField(msg, buf, "tighteningErrorStatus", "number", 10, position, cb) &&
                serializerKey(msg, buf, 20, 2, position, cb) &&
                serializerField(msg, buf, "prevailTorqueCompensateStatus", "number", 1, position, cb) &&
                serializerKey(msg, buf, 19, 2, position, cb) &&
                serializerField(msg, buf, "prevailTorqueMonitoringStatus", "number", 1, position, cb) &&
                serializerKey(msg, buf, 18, 2, position, cb) &&
                serializerField(msg, buf, "selftapStatus", "number", 1, position, cb) &&
                serializerKey(msg, buf, 17, 2, position, cb) &&
                serializerField(msg, buf, "currentMonitoringStatus", "number", 1, position, cb) &&
                serializerKey(msg, buf, 16, 2, position, cb) &&
                serializerField(msg, buf, "rundownAngleStatus", "number", 1, position, cb) &&
                serializerKey(msg, buf, 15, 2, position, cb) &&
                serializerField(msg, buf, "angleStatus", "number", 1, position, cb) &&
                serializerKey(msg, buf, 14, 2, position, cb) &&
                serializerField(msg, buf, "torqueStatus", "number", 1, position, cb) &&
                serializerKey(msg, buf, 13, 2, position, cb) &&
                serializerField(msg, buf, "batchStatus", "number", 1, position, cb) &&
                serializerKey(msg, buf, 12, 2, position, cb) &&
                serializerField(msg, buf, "tighteningStatus", "number", 1, position, cb) &&
                serializerKey(msg, buf, 11, 2, position, cb) &&
                serializerField(msg, buf, "batchCounter", "number", 4, position, cb) &&
                serializerKey(msg, buf, 10, 2, position, cb) &&
                serializerField(msg, buf, "batchSize", "number", 4, position, cb) &&
                serializerKey(msg, buf, 9, 2, position, cb) &&
                serializerField(msg, buf, "strategyOptions", "number", 5, position, cb) &&
                serializerKey(msg, buf, 8, 2, position, cb) &&
                serializerField(msg, buf, "strategy", "number", 2, position, cb) &&
                serializerKey(msg, buf, 7, 2, position, cb) &&
                serializerField(msg, buf, "parameterSetID", "number", 3, position, cb) &&
                serializerKey(msg, buf, 6, 2, position, cb) &&
                serializerField(msg, buf, "jobID", "number", 4, position, cb) &&
                serializerKey(msg, buf, 5, 2, position, cb) &&
                serializerField(msg, buf, "numberVIN", "rawString", 25, position, cb) &&
                serializerKey(msg, buf, 4, 2, position, cb) &&
                serializerField(msg, buf, "torqueControllerName", "string", 25, position, cb) &&
                serializerKey(msg, buf, 3, 2, position, cb) &&
                serializerField(msg, buf, "channelID", "number", 2, position, cb) &&
                serializerKey(msg, buf, 2, 2, position, cb) &&
                serializerField(msg, buf, "cellID", "number", 4, position, cb) &&
                serializerKey(msg, buf, 1, 2, position, cb);

            if (!statusprocess) {
                return;
            }

            msg.payload = buf;

            cb(null, msg);

            break;

        case 1:

            buf = Buffer.alloc(211);

            position.value = 211;

            msg.payload.angleStatus = serializerStatus(msg.payload.angleStatus);
            msg.payload.torqueStatus = serializerStatus(msg.payload.torqueStatus);
            msg.payload.batchStatus = serializerStatus(msg.payload.batchStatus);
            msg.payload.tighteningStatus = serializerStatus(msg.payload.tighteningStatus);

            msg.payload.torque = Math.trunc(msg.payload.torque * 100);
            msg.payload.torqueFinalTarget = Math.trunc(msg.payload.torqueFinalTarget * 100);
            msg.payload.torqueMaxLimit = Math.trunc(msg.payload.torqueMaxLimit * 100);
            msg.payload.torqueMinLimit = Math.trunc(msg.payload.torqueMinLimit * 100);

            statusprocess =
                serializerField(msg, buf, "tighteningID", "number", 10, position, cb) &&
                serializerKey(msg, buf, 23, 2, position, cb) &&
                serializerField(msg, buf, "batchStatus", "number", 1, position, cb) &&
                serializerKey(msg, buf, 22, 2, position, cb) &&
                serializerField(msg, buf, "timeLastChange", "string", 19, position, cb) &&
                serializerKey(msg, buf, 21, 2, position, cb) &&
                serializerField(msg, buf, "timeStamp", "string", 19, position, cb) &&
                serializerKey(msg, buf, 20, 2, position, cb) &&
                serializerField(msg, buf, "angle", "number", 5, position, cb) &&
                serializerKey(msg, buf, 19, 2, position, cb) &&
                serializerField(msg, buf, "finalAngleTarget", "number", 5, position, cb) &&
                serializerKey(msg, buf, 18, 2, position, cb) &&
                serializerField(msg, buf, "angleMax", "number", 5, position, cb) &&
                serializerKey(msg, buf, 17, 2, position, cb) &&
                serializerField(msg, buf, "angleMin", "number", 5, position, cb) &&
                serializerKey(msg, buf, 16, 2, position, cb) &&
                serializerField(msg, buf, "torque", "number", 6, position, cb) &&
                serializerKey(msg, buf, 15, 2, position, cb) &&
                serializerField(msg, buf, "torqueFinalTarget", "number", 6, position, cb) &&
                serializerKey(msg, buf, 14, 2, position, cb) &&
                serializerField(msg, buf, "torqueMaxLimit", "number", 6, position, cb) &&
                serializerKey(msg, buf, 13, 2, position, cb) &&
                serializerField(msg, buf, "torqueMinLimit", "number", 6, position, cb) &&
                serializerKey(msg, buf, 12, 2, position, cb) &&
                serializerField(msg, buf, "angleStatus", "number", 1, position, cb) &&
                serializerKey(msg, buf, 11, 2, position, cb) &&
                serializerField(msg, buf, "torqueStatus", "number", 1, position, cb) &&
                serializerKey(msg, buf, 10, 2, position, cb) &&
                serializerField(msg, buf, "tighteningStatus", "number", 1, position, cb) &&
                serializerKey(msg, buf, 9, 2, position, cb) &&
                serializerField(msg, buf, "batchCounter", "number", 4, position, cb) &&
                serializerKey(msg, buf, 8, 2, position, cb) &&
                serializerField(msg, buf, "batchSize", "number", 4, position, cb) &&
                serializerKey(msg, buf, 7, 2, position, cb) &&
                serializerField(msg, buf, "parameterSetID", "number", 3, position, cb) &&
                serializerKey(msg, buf, 6, 2, position, cb) &&
                serializerField(msg, buf, "jobID", "number", 2, position, cb) &&
                serializerKey(msg, buf, 5, 2, position, cb) &&
                serializerField(msg, buf, "numberVIN", "rawString", 25, position, cb) &&
                serializerKey(msg, buf, 4, 2, position, cb) &&
                serializerField(msg, buf, "torqueControllerName", "string", 25, position, cb) &&
                serializerKey(msg, buf, 3, 2, position, cb) &&
                serializerField(msg, buf, "channelID", "number", 2, position, cb) &&
                serializerKey(msg, buf, 2, 2, position, cb) &&
                serializerField(msg, buf, "cellID", "number", 4, position, cb) &&
                serializerKey(msg, buf, 1, 2, position, cb);

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

function checkBitMap(type, number, length) {

    let retorno = new Array(length);

    for (let i = 0; i < length; i++) {

        if (((1 << i) & number) > 0) {
            retorno[i] = constantsMID[type][i];
        } else {
            retorno[i] = undefined;
        }

    }

    return retorno;
}

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

    return value;
}

function serializerBitMap(data, length){

    let retorno = 0;

    if(!isNaN(data)){
        return data;
    }

    for(let i = 0; i < length; i++){
        if(data[i]){
            retorno  |= 1 << i;
        }
    }

    return retorno;
}

function serializerOptions(type, data){

    if(!isNaN(data)){
        return data;
    }

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
