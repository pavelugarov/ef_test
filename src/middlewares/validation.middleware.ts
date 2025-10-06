import { plainToInstance } from 'class-transformer';
import { validate, ValidationError } from 'class-validator';
import { Request, Response, NextFunction } from "express";
import HttpException from '../exceptions/http.exception';


export function ValidationBodyMiddleware(type: any, skipMissingProperties = false) {
  return function validationMiddleware(req: Request, res: Response, next: NextFunction): void {
      validate(plainToInstance(type, req.body ? req.body : {}), { skipMissingProperties })
        .then((errors: ValidationError[]) => {
          if (errors.length > 0) {
            const message = errors.map((error: ValidationError) => Object.values(error.constraints)).join(', ');
            next(new HttpException(400, message, 100));
          } else {
            next();
          }
        });

  }
}