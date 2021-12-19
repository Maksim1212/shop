import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { UserRegisterDto } from './dto/user.register.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async finUserByEmail(email: string): Promise<User> {
    return this.usersRepository.findOne({ email });
  }

  async createUser(data: UserRegisterDto): Promise<string> {
    const newUser = await this.usersRepository.create(data);
    await this.usersRepository.save(newUser);
    return 'User registered';
  }
}
