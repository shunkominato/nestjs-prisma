import { Inject, Injectable, LoggerService } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

type SlackChannel = {
  DEV_LOG: 'dev-log';
  INFO: 'info';
  WARN: 'warn';
  ERROR: 'error';
  FATAL: 'fatal';
};

@Injectable()
export class LogService implements LoggerService {
  constructor(private config: ConfigService) {}

  private CHANNEL: {
    DEV_LOG: 'dev-log';
    INFO: 'info';
    WARN: 'warn';
    ERROR: 'error';
    FATAL: 'fatal';
  };

  log({ message }: { message: string }) {
    this.send({ message, channel: this.CHANNEL.INFO });
  }

  info({ message }: { message: string }) {
    this.send({ message, channel: this.CHANNEL.INFO });
  }

  warn = ({ message }: { message: string }) =>
    this.send({ message, channel: this.CHANNEL.WARN });

  error = ({ message }: { message: string }) =>
    this.send({ message, channel: this.CHANNEL.ERROR });

  fatal = ({ message }: { message: string }) =>
    this.send({ message, channel: this.CHANNEL.FATAL });

  async send({
    message,
    channel: originalChannel = this.CHANNEL.INFO,
  }: {
    message: string;
    channel?: SlackChannel[keyof SlackChannel];
  }) {
    const channel = originalChannel;
    console.log(message);
    console.log(channel);
    console.log(this.config.get('DATABASE_URL'));

    // if (!const secret = env("IS_PRODUCTION")) {
    //   channel = this.CHANNEL.DEV_LOG;
    //   header = `${header}[${originalChannel}]`;
    // }

    // await slack.chat.postMessage({
    //   channel: `#${channel}`,
    //   text: `${header}\n${message}`,
    // });
  }
}
