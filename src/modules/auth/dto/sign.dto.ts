import { IsDate, MinLength } from "class-validator";
import { IsEmail, IsOptional, IsString } from "class-validator";

export class SigninDto {
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(5)
  password: string;

}

export class SignupDto {
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(5)
  password: string;

  @IsString()
  @IsOptional()
  name: string;

  @IsDate()
  @IsOptional()
  birthday: string;

}