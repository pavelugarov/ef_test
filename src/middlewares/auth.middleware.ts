import { Request, Response, NextFunction } from "express";
import * as jwt from 'jsonwebtoken';
import { NotAuthorizedException, NotPermittedException, UserBlockedException, UserNotFoundException } from "../exceptions/auth.error";
import { Roles } from "../enums/index";
import userService from "../modules/users/user.service";
import config from '../config/config';



export function AuthMiddleware(roles: Roles[]) {
  return async function Auth(req: Request, res: Response, next: NextFunction): Promise<void> {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      next(new NotAuthorizedException());
      return;
    }
    
    try {
      const decoded = jwt.verify(token, config.JWT_SECRET) as {userId: number, role: Roles};
      const {userId, role} = decoded;
      if (roles?.length) {
        if (!roles.includes(role)) {
          next(new NotPermittedException());
          return;
        }
      }

      const user = await userService.getUserById(userId);
      if (!user) next(new UserNotFoundException());
      if (!user.active) next(new UserBlockedException());

      req['userId'] = userId;
      req['role'] = role;
    } catch(e) {
      next(new NotAuthorizedException());
      return;
    }


    next();

    return;
  }

}
