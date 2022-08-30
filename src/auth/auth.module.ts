import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy'
import { UsersModule } from '../users/users.module'
import { AuthController } from './auth.controller';

@Module({
  imports: [ JwtModule.register({
    secret: process.env.JWT_SECRET,
    signOptions: {expiresIn: '24h'}
  }),
  UsersModule,
  
  ],
  providers: [AuthService, JwtStrategy],
  exports: [AuthService],
  controllers: [AuthController]
})
export class AuthModule {}
