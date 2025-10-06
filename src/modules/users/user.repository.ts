import { db } from '../../db';
import { Table } from '../../enums';
import { User, UserEntity } from './enities/user.entry';
import { SignupDto } from '../auth/dto/sign.dto';


export class UserRepository {
  private static instance = new UserRepository();
  public static getInstance(): UserRepository {
    return this.instance;
  }
  
  async createUser(dto: SignupDto): Promise<UserEntity> {
    const [user] = await db(Table.USERS).insert(dto, '*');
    return user;
  }

  async findUserByLogin(email: string): Promise<UserEntity | null> {
    const user = await db(Table.USERS).select('*').where({ email }).first();
    if (!user) return null;
    return user;
  }

  async getUserById(id: number): Promise<UserEntity | null> {
    const user = await db(Table.USERS).select('*').where({ id }).first();
    if (!user) return null;
    const {password, ...userData} = user;
    return userData;
  }

  async getUsers(size: number, page: number): Promise<User[]> {
    console.log('getUsers', size, page)
    const users = await db(Table.USERS).select('*').limit(size).offset(size*(page-1));    
    return users.map(user => {
      const {password, ...userData} = user;
      return userData
    });
  }

  async blockUser(id: number): Promise<boolean> {
    const result = await db(Table.USERS).update({active: false}).where({ id });
    return result > 0;
  }
  
}
