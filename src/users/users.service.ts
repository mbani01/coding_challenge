import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import {Repository} from 'typeorm'
import { User } from './entities/user.entity'
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class UsersService {

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService
  ){}

  async create(createUserDto: CreateUserDto) {
    const user = await this.userRepository.create(createUserDto);
    await this.userRepository.save(user)
    return user;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  async authenticate(userId: string) {
    const user = await this.userRepository.findOne({where: {id: userId}});
    if (user)
    return {api_key: this.jwtService.sign({id: userId})}
  }
}
  
