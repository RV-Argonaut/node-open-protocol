import midGroups from './src/midGroups.json';
import midCommands from './src/midCommand.json';
import midRequests from './src/midRequest.json';
import SessionControlOpts from './src/sessionControlClient';

export * as OpenProtocolParser from './src/openProtocolParser';
export * as OpenProtocalSerializer from './src/openProtocolSerializer';
export * as SessionControlClient from './src/sessionControlClient';
export * as MIDParser from './src/MIDParser'
export * as MIDSerializer from './src/MIDSerializer'
export * as helpers from './src/helpers'

export function createClient (port: number, host?: string, opts?: SessionControlOpts, connectionListener?: () => void): SessionControlClient;

export const constants = {
  subscribes: midGroups,
  commands: midCommands,
  requests: midRequests,
};

export {
  OpenProtocolParser,
  OpenProtocalSerializer,
  SessionControlClient,
  MIDParser,
  MIDSerializer,
  helpers,
  createClient
}
