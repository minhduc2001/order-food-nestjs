import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async getAllUsers(): Promise<User[]> {
    return this.userRepository.find();
  }

  async register(user: CreateUserDto): Promise<User | any> {
    try {
      const newUser = await this.userRepository.create(user);
      const salt = await bcrypt.genSalt(10);
      const passwordHash = await bcrypt.hash(newUser.password, salt);
      newUser.password = passwordHash;
      return this.userRepository.save(newUser);
    } catch (error) {
      return error;
    }
  }

  async addUser(user): Promise<User> {
    return this.userRepository.save(user);
  }

  async removeUser(id: string): Promise<any> {
    return this.userRepository.delete(id);
  }

  async updateUser(id: string, user): Promise<any> {
    return this.userRepository.update(id, user);
  }

  async getUser(id: string): Promise<User> {
    return this.userRepository.findOne({ where: { id } });
  }

  async findUserByPhone(phone: string): Promise<User> {
    return this.userRepository.findOne({ where: { phone } });
  }

  async findByPhoneWithPassword(phone: string): Promise<User> {
    return this.userRepository.findOne({ where: { phone: phone } });
  }

  async compareHash(password: string, hash: string): Promise<boolean> {
    return await bcrypt.compare(password, hash);
  }
}
