import { PrismaClientKnownRequestError } from '@prisma/client/runtime';

export const makeErrorLogMessage = ({
  error,
  useCase,
}: {
  error: PrismaClientKnownRequestError | Error;
  useCase: string;
}) => {
  if (error instanceof PrismaClientKnownRequestError) {
    return `
\` useCase: ${useCase}\`
\`\`\`errorCode: ${error.code}\`\`\`
\`\`\`errorMessage: ${error.message}\`\`\`
`;
  }

  return `
\` useCase: ${useCase}\`
\`\`\`errorMessage: ${error.message ? error.message : 'login error'}\`\`\`
`;
};
