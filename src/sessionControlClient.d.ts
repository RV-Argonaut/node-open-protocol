import { Socket } from 'net';
import { LinkLayerOpts } from './linkLayer';
import EventEmitter from 'events';
import { MID0002 } from './mid/0002';

export type SessionControlOpts = {
    stream: Socket;
    defaultRevisions?: unknown;
    useLinkLayer?: boolean;
    useGenerics?: boolean;
    keepAlive?: number;
} & Pick<LinkLayerOpts, 'rawData' | 'timeOut' | 'retryTimes' | 'disableMidParsing'>;

export = class SessionControlClient extends EventEmitter {
    constructor(opts: SessionControlOpts);
    connect (cb?: (controllerData: MID0002) => void): Promise<MID0002>;
}
