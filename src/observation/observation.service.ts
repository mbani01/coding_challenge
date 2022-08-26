import { Injectable } from '@nestjs/common';
import { CreateObservationDto } from './dto/create-observation.dto';
import { UpdateObservationDto } from './dto/update-observation.dto';
import { Observation } from './entities/observation.entity';
import { InjectRepository } from '@nestjs/typeorm';
import {Repository} from 'typeorm'
@Injectable()
export class ObservationService {

  constructor(@InjectRepository(Observation)
  private readonly observationRepository: Repository<Observation>)
  {}  
  async create(createObservationDto: CreateObservationDto, userId: any) {
    const observation = await this.observationRepository.create({...createObservationDto, user:userId}) 
    await this.observationRepository.save(observation);
    return observation
  }

  async findAll(userId: any) {
    return await this.observationRepository.find({ relations: ["user"] });
  }

  async findOne(id: string, userId: any) {
    return await this.observationRepository.findOne({ where: {
      user: {
          id: userId
      },
      id,
  }});
  }

  async update(id: string, updateObservationDto: UpdateObservationDto, userId: any) 
  {
    const observation = await this.observationRepository.update({id}, {...updateObservationDto, user: userId})
    return observation;
  }

  async remove(id: string, userId: any) {
    return await this.observationRepository.delete({id, user: {id: userId}})
  }
}
