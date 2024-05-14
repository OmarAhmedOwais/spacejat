import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

import { ApiError } from '@/util';
import { Status } from '@/types/enums/status.enum';

export const globalErrorMiddleware = async (
  err: ApiError,
  req: Request,
  res: Response,
  _next: NextFunction,
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
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      status: Status.ERROR,
      error_en: err.message,
      error_ar: err.message,
      ...envExtra,
    });
  }
  res.status(err.statusCode).json({
    status: Status.ERROR,
    error_en: err.msg.en,
    error_ar: err.msg.ar,
    ...envExtra,
  });
};
