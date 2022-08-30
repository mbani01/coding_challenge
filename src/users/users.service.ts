import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import {Repository} from 'typeorm'
import { User } from './entities/user.entity';
@Injectable()
export class UsersService {

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ){}

  async create(createUserDto: CreateUserDto) {
    const user = await this.userRepository.create(createUserDto);
    await this.userRepository.save(user)
    return user;
  }

  async findOne(id: string) {
    const user = await this.userRepository.findOne({where: {id}});
    return user;
  }
}
  
