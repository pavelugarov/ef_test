import { AppRouter } from "../router/AppRouter";
import { HttpMethods, ControllerDecoratorParams } from "../enums/index";
import { RequestHandler } from "express";
import { Roles } from "../enums/index";
import { AuthMiddleware } from "../middlewares/auth.middleware";
import { ValidationBodyMiddleware } from "../middlewares/validation.middleware";


export function Controller(path: string): Function {
  return function (target: any): void {
    const router = AppRouter.router;

    for (const _action in target.prototype) {
      if (target.prototype.hasOwnProperty(_action)) {
        const _path: string = Reflect.getMetadata(ControllerDecoratorParams.Path, target.prototype, _action) || '';
        const method: HttpMethods = Reflect.getMetadata(ControllerDecoratorParams.Method, target.prototype, _action);
        const middlewares: RequestHandler[] = Reflect.getMetadata(ControllerDecoratorParams.Middleware, target.prototype, _action) || [];
        
        const roles: Roles[] = Reflect.getMetadata(ControllerDecoratorParams.Auth, target.prototype, _action);
        if (roles !== undefined)
          middlewares.push(AuthMiddleware(roles));

        const validateBody = Reflect.getMetadata(ControllerDecoratorParams.ValidateBody, target.prototype, _action);
        if (validateBody)
          middlewares.push(ValidationBodyMiddleware(validateBody.type, validateBody.skipMissingProperties));


        router[method](`${path}${_path}`, middlewares, target.prototype[_action]);
      }
    }
  }
}
