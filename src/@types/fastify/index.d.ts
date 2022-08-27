import { User } from '@prisma/client';

declare module 'fastify' {
  export interface FastifyRequest {
    user: Omit<User, 'hashedPassword'>;
  }
}
