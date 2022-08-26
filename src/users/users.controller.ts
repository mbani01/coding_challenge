import { Controller, Get, Post, Body, Patch, Param, UseGuards, Query } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { AuthenticateDto } from './dto/authenticate.dto';
import { JwtAuthGuard } from './jwt.guard'
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}


  
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    // return this.usersService.create(createUserDto);
  }

  @Post('api-key')
  async authenticate(@Body() authenticateDto: AuthenticateDto) {
    return await this.usersService.authenticate(authenticateDto.userId);
  }

  @UseGuards(JwtAuthGuard)
  @Get('protected')
  empty(@Query('api_key') key: string)
  {
    return "Authorized"
  }
}
