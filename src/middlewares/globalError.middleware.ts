import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';
import { StatusCodes } from 'http-status-codes';

import { ApiError } from '@/util';
import { Status } from '@/types/enums/status.enum';

export const globalErrorMiddleware = (app: FastifyInstance) => {
  const isProduction = process.env.NODE_ENV === 'prod';

  app.setErrorHandler(
    async (err: ApiError, _req: FastifyRequest, reply: FastifyReply) => {
      const isApiError = err?.statusCode && err?.msg;
      const errorDetails = isProduction
        ? {
            name: err.name,
            message: err.message,
          }
        : {
            name: err.name,
            message: err.message,
            stack: err.stack,
          };

      const response = {
        status: Status.ERROR,
        error_en: isApiError ? err.msg.en : err.message,
        error_ar: isApiError ? err.msg.ar : err.message,
        ...errorDetails,
      };

      const statusCode = isApiError
        ? err.statusCode
        : StatusCodes.INTERNAL_SERVER_ERROR;

      reply.code(statusCode).send(response);
    },
  );
};
