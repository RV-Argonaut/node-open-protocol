import { DuplexOptions } from 'stream';
import { Socket } from 'net';
import { OpenProtocolParserOpts } from './openProtocolParser';

export type LinkLayerOpts = DuplexOptions & {
  rawData?: boolean;
  stream: Socket;
  timeOut?: number;
  retryTimes?: number;
  disableMidParsing?: Record<number, boolean>;
} & Pick<OpenProtocolParserOpts, 'rawData'>;

export = class LinkLayer extends Duplex {
  constructor (opts: LinkLayerOpts);
}
