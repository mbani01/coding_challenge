import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { CreateObservationDto } from './dto/create-observation.dto';
import { UpdateObservationDto } from './dto/update-observation.dto';
import { Observation } from './entities/observation.entity';
import { InjectRepository } from '@nestjs/typeorm';
import {Repository} from 'typeorm'
import {ObservationPicture} from './entities/observation_pictures.entity'
import { CloudinaryService } from "../cloudinary/cloudinary.service";
@Injectable()
export class ObservationService {

  constructor(@InjectRepository(Observation)
  private readonly observationRepository: Repository<Observation>,
  @InjectRepository(ObservationPicture)
  private readonly observationPicRepo: Repository<ObservationPicture>,
  private cloudinary: CloudinaryService,
  )
  {}  
  async create(createObservationDto: CreateObservationDto, userId: any) {
    const observation = await this.observationRepository.create({...createObservationDto, user:userId}) 
    await this.observationRepository.save(observation);
    return observation
  }

  async findAll(userId: any) {
    return await this.observationRepository.find({ relations: ["user", "pictures"] });
  }

  async findOne(id: string, userId: any) {
    return await this.observationRepository.findOne({ where: {
      user: {
          id: userId
      },
      id},
      relations: ["user", "pictures"]
  });
  }

  async update(id: string, updateObservationDto: UpdateObservationDto, userId: any) 
  {
    const observation = await this.observationRepository.update({id}, {...updateObservationDto, user: userId})
    return observation;
  }

  async remove(id: string, userId: any) {
    return await this.observationRepository.delete({id, user: {id: userId}})
  }

  async updatePicture(id: any, file: Express.Multer.File)
  {
    const observation = await this.observationRepository.findOne({where: {id}});
    if (!observation)
     throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    const upload_count = await this.observationPicRepo.count({where: {observation: {id}}})
    if (upload_count >= 10)
     throw new HttpException('You cannot upload more than 10 images', 400);
    // get img link
    const img = await this.cloudinary.uploadImage(file);
    const img_link = img.secure_url;
    const observation_picture = await this.observationPicRepo.create({observation: id, picture: img_link});
    await this.observationPicRepo.save(observation_picture);
    return observation_picture;

  }
  
}
