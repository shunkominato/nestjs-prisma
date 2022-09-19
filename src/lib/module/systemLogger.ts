import pino from 'pino';

export const SystemLogger = ({
  destination = 'systemLog/system.log',
}: {
  destination: string;
}) => {
  return pino({
    transport: {
      target: 'pino/file',
      options: {
        destination,
        mkdir: true,
      },
    },
  });
};
