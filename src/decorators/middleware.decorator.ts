import { Roles } from "../enums/index";
import { ControllerDecoratorParams } from "../enums/index";
import { RequestHandler } from "express";

export function Middleware(middlewares: RequestHandler[]): Function {
  return function (target: any, propertyKey: string): void {
    Reflect.defineMetadata(ControllerDecoratorParams.Middleware, middlewares, target, propertyKey);
  }
}

export function Auth(roles: Roles[] = []): Function {
  return function (target: any, propertyName: string, descriptor: TypedPropertyDescriptor<Function>): void {
    Reflect.defineMetadata(ControllerDecoratorParams.Auth, roles, target, propertyName);    
  }
}

export function ValidateBody(type: any, skipMissingProperties = false): Function {
  return function (target: any, propertyKey: string): void {
    Reflect.defineMetadata(ControllerDecoratorParams.ValidateBody, { type, skipMissingProperties }, target, propertyKey);
  }
}



