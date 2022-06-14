//@ts-check
/*
  Copyright: (c) 2018-2020, Smart-Tech Controle e Automação
  GNU General Public License v3.0+ (see LICENSE or https://www.gnu.org/licenses/gpl-3.0.txt)
*/

const OpenProtocolParser = require("./src/openProtocolParser");
const OpenProtocalSerializer = require("./src/openProtocolSerializer");
const MIDParser = require("./src/MIDParser");
const MIDSerializer = require("./src/MIDSerializer");
const helpers = require("./src/helpers");
const { SessionControlClient } = require("./src/sessionControlClient");

const midGroups = require("./src/midGroups");
const midCommand = require("./src/midCommand");
const midrequest = require("./src/midRequest");

const net = require("net");

/**
 * 
 * @param {number} port 
 * @param {string} host 
 * @param {Partial<import("./src/sessionControlClient.js").SessionControlClientOpts>} [opts]
 * @param {(controllerData: import("./src/mid/0002.js").MID0002) => void} [connectionListener] 
 * @returns 
 */
function createClient(port, host, opts, connectionListener) {

    if (connectionListener === undefined) {
        if (typeof opts === "function") {
            connectionListener = /** @type {(controllerData: import("./src/mid/0002.js").MID0002) => void} */ (opts);
            opts = {};
        } else {
            connectionListener = () => {
            };
        }
    }

    opts = opts || {};

    let socket = net.createConnection(port, host, () => {
        socket.setTimeout(0);
        client.connect(connectionListener);
    });

    socket.setTimeout(20000);

    socket.once("timeout", () => onTimeout());

    function onTimeout() {
        let e = /** @type {Error & { code: String, address: String, port: number }} */ (new Error("Socket Timeout"));
        e.code = "SOCKET_TIMEOUT";
        e.address = host;
        e.port = port;
        client.emit("error", e);
    }

    opts.stream = socket;

    let client = new SessionControlClient(/** @type {import("./src/sessionControlClient.js").SessionControlClientOpts} */(opts));

    return client;
}

module.exports = {
    constants: {
        subscribes: midGroups,
        commands: midCommand,
        requests: midrequest
    },
    OpenProtocolParser,
    OpenProtocalSerializer,
    SessionControlClient,
    MIDParser,
    MIDSerializer,
    helpers,
    createClient
};
