import { Module } from '@nestjs/common';
import { ObservationService } from './observation.service';
import { ObservationController } from './observation.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Observation } from './entities/observation.entity';
import {ObservationPicture} from './entities/observation_pictures.entity'
import { CloudinaryModule } from 'src/cloudinary/cloudinary.module';
@Module({
  imports: [TypeOrmModule.forFeature([Observation, ObservationPicture]), CloudinaryModule],
  controllers: [ObservationController],
  providers: [ObservationService]
})
export class ObservationModule {}
