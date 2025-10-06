import { Request, Response } from "express";
import { SigninDto, SignupDto } from "./dto/sign.dto";
import authService from './auth.service';
import { Controller } from "../../decorators/controller.decorator";
import { Post } from "../../decorators/http-methods.decorator";
import { ValidateBody } from "../../decorators/middleware.decorator";


@Controller('/auth')
export class AuthController {

  @Post('/signin')
  @ValidateBody(SigninDto)
  async signIn(request: Request, response: Response) {
    const { email, password } = request.body;
    const token = await authService.signIn(email, password);
    response.send({ token });
  }

  @Post('/signup')
  @ValidateBody(SignupDto)
  async signUp(request: Request, response: Response) {    
    const token = await authService.signUp(request.body);
    response.send({ token });
  }

}
