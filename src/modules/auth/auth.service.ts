import * as bcrypt from 'bcrypt';
import { NotAuthorizedException, UserExistsException } from '../../exceptions/auth.error';
import * as jwt from 'jsonwebtoken';
import { UserEntity } from '../users/enities/user.entry';
import { SignupDto } from './dto/sign.dto';
import { UserRepository } from '../users/user.repository';
import config from '../../config/config';
const SALT_OR_ROUNDS = 12;


class AuthService {
  private userRepository = UserRepository.getInstance();

  async signIn(email: string, password: string): Promise<string> {
    const user = await this.userRepository.findUserByLogin(email);
    if (!user) throw new NotAuthorizedException();
    const checkPassword: boolean = await bcrypt.compare(password, user.password);
    if (!checkPassword) throw new NotAuthorizedException();

    const token = this.getToken(user);
    return token;
  }


  async signUp(dto: SignupDto) {
    const existUser = await this.userRepository.findUserByLogin(dto.email);
    if (existUser) new UserExistsException();
    dto.password = await bcrypt.hash(dto.password, SALT_OR_ROUNDS);
    const user = await this.userRepository.createUser(dto);
    const token = this.getToken(user);
    return token;
  }

  getToken(user: UserEntity): string {    
    return jwt.sign({ userId: user.id, role: user.role }, config.JWT_SECRET, { expiresIn: config.TOKEN_EXP_TIME});
  }

}

export default new AuthService();