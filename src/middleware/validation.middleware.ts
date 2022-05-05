import {RequestHandler, Request, Response, NextFunction} from 'express';
import Joi from 'joi';

function validateMiddleware(schma: Joi.Schema): RequestHandler {
  return async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    const validationOption = {
      abortEarly: false,
      allowUnknown: true,
      stripeUnknown: true,
    };
    try {
      const value = await schma.validateAsync(req.body, validationOption);
      req.body = value;
      next();
    } catch (e: any) {
      const errors: string[] = [];
      e.details.forEach((error: Joi.ValidationErrorItem) => {
        console.log('AAA');
        errors.push(error.message);
      });

      res.send(400).send({errors});
    }
  };
}

export default validateMiddleware;
