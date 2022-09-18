import { Inject, Injectable, LoggerService } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

export const LOG_LEVEL = {
  DEV_LOG: 'dev-log',
  INFO: 'info',
  WARN: 'warn',
  ERROR: 'error',
  FATAL: 'fatal',
} as const;

@Injectable()
export class LogService implements LoggerService {
  constructor(private config: ConfigService) {}

  log({ message }: { message: string }) {
    this.send({ message, channel: LOG_LEVEL.INFO });
  }

  info({ message }: { message: string }) {
    this.send({ message, channel: LOG_LEVEL.INFO });
  }

  warn({ message }: { message: string }) {
    this.send({ message, channel: LOG_LEVEL.WARN });
  }

  error({ message }: { message: string }) {
    this.send({ message, channel: LOG_LEVEL.ERROR });
  }

  fatal({ message }: { message: string }) {
    this.send({ message, channel: LOG_LEVEL.FATAL });
  }

  async send({
    message,
    channel: originalChannel = LOG_LEVEL.INFO,
  }: {
    message: string;
    channel?: typeof LOG_LEVEL[keyof typeof LOG_LEVEL];
  }) {
    let channel = originalChannel;
    console.log('-----looger----');
    console.log(message);
    console.log(channel);
    console.log(this.config.get('IS_PRODUCTION'));

    if (!this.config.get('IS_PRODUCTION')) {
      channel = LOG_LEVEL.DEV_LOG;
    }
    // if (!const secret = env("IS_PRODUCTION")) {
    //   channel = LOG_LEVEL.DEV_LOG;
    //   header = `${header}[${originalChannel}]`;
    // }

    // await slack.chat.postMessage({
    //   channel: `#${channel}`,
    //   text: `${header}\n${message}`,
    // });
  }
}
