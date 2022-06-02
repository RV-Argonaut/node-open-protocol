import { Socket } from 'net';
import { LinkLayerOpts } from './linkLayer';

export type SessionControlOpts = {
    stream: Socket;
    defaultRevisions?: unknown;
    useLinkLayer?: boolean;
    useGenerics?: boolean;
    keepAlive?: number;
} & Pick<LinkLayerOpts, 'rawData' | 'timeOut' | 'retryTimes' | 'disableMidParsing'>;

export = class SessionControlClient extends EventEmitter {
    constructor(opts: SessionControlOpts);
}
