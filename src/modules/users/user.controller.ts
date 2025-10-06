import { Request, Response } from "express";
import { Roles } from "../../enums/index";
import userService from "./user.service";
import { Controller } from "../../decorators/controller.decorator";
import { Get } from "../../decorators/http-methods.decorator";
import { Auth, CurrentUser } from "../../decorators/middleware.decorator";

const LIST_SIZE = 10;

@Controller('/users')
export class UserController {

  @Get('/:id')
  @Auth([Roles.ADMIN, Roles.USER])
  async getUser(req: Request, res: Response, next: any, @CurrentUser p: any, ) {
    const userId = req['role'] === Roles.ADMIN ? req.params.id : req['userId'];
    const user = await userService.getUserById(+userId);
    res.send(user);
  }

  @Get()
  @Auth([Roles.ADMIN])
  async getUsers(req: Request, res: Response) {
    const {size, page} = req.query;
    const users = await userService.getUsers(Math.abs(+size) || LIST_SIZE, Math.abs(+page) || 1);
    res.send(users);
  }

  @Get('/block/:id')
  @Auth([Roles.ADMIN, Roles.USER])
  async blockUser(req: Request, res: Response) {
    const userId = req['role'] === Roles.ADMIN ? req.params.id : req['userId'];
    const result = await userService.blockUser(+userId);
    res.send(result);
  }
}
