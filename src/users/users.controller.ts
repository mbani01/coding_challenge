import { Controller, Get, Post, Body, Patch, Param, UseGuards, Query } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { AuthenticateDto } from '../auth/dto/authenticate.dto';
import { JwtAuthGuard } from '../auth/jwt.guard'
import { ApiBearerAuth, ApiHeader } from '@nestjs/swagger';
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  // @UseGuards(JwtAuthGuard)
  // @ApiBearerAuth('JWT')
  // @Get('protected')
  // // @ApiHeader({name: 'Authorization'})
  // empty()
  // {
  //   return "Authorized"
  // }
}
