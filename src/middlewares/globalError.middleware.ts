import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';
import { StatusCodes } from 'http-status-codes';

import { ApiError } from '@/util';
import { Status } from '@/types/enums/status.enum';

export const globalErrorMiddleware = (app: FastifyInstance) => {
  app.setErrorHandler(
    async (
      err: ApiError,
      _req: FastifyRequest,
      reply: FastifyReply,
    ) => {
      const isPredicted = err?.statusCode && err?.msg;
      const envExtra =
        process.env.NODE_ENV === 'prod'
          ? {
              prod: {
                name: err.name,
                message: err.message,
              },
            }
          : {
              dev: {
                name: err.name,
                message: err.message,
                stack: err.stack,
              },
            };
      if (!isPredicted) {
        console.log('err');
        reply.code(StatusCodes.INTERNAL_SERVER_ERROR).send({
          status: Status.ERROR,
          error_en: err.message,
          error_ar: err.message,
          ...envExtra,
        });
      } else {
        reply.code(err.statusCode).send({
          status: Status.ERROR,
          error_en: err.msg.en,
          error_ar: err.msg.ar,
          ...envExtra,
        });
      }
    },
  );
};
