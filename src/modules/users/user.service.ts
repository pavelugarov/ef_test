import { User } from '../users/enities/user.entry';
import { UserRepository } from '../users/user.repository';


class UserService {  
  private userRepository = UserRepository.getInstance();

  async getUserById(id: number): Promise<User> {
    const user = await this.userRepository.getUserById(id);
    return user;
  }

  async getUsers(size: number, page: number): Promise<User[]> {
    const users = await this.userRepository.getUsers(size, page);
    return users;
  }

  blockUser(id: number): Promise<boolean> {
    return this.userRepository.blockUser(id);
  }

}

export default new UserService();