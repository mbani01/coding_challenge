import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { ObservationModule } from './observation/observation.module';
import { CloudinaryProvider } from './cloudinary/cloudinary.provider';
import { CloudinaryModule } from './cloudinary/cloudinary.module';
import * as  typeOrmConfig  from './typeorm.config'

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    UsersModule,
    ObservationModule,
    CloudinaryModule,
  ],
  controllers: [AppController],
  providers: [AppService, CloudinaryProvider],
})
export class AppModule {}
