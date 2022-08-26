import { Controller, Get, Post, Body, Req, Patch, Param, Query, Delete, UseGuards } from '@nestjs/common';
import { ObservationService } from './observation.service';
import { CreateObservationDto } from './dto/create-observation.dto';
import { UpdateObservationDto } from './dto/update-observation.dto';
import { JwtAuthGuard } from 'src/users/jwt.guard';
@Controller('observation')
export class ObservationController {
  constructor(private readonly observationService: ObservationService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Req() req, @Query('api_key') api_key: string, @Body() createObservationDto: CreateObservationDto) {
   
    return this.observationService.create(createObservationDto, req.user.userId);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll(@Req() req, @Query('api_key') api_key: string,) {
    return this.observationService.findAll(req.user.userId);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string, @Req() req, @Query('api_key') api_key: string) {
    return this.observationService.findOne(id, req.user.userId);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(@Req() req, @Query('api_key') api_key: string, @Param('id') id: string, @Body() updateObservationDto: UpdateObservationDto) {
    return this.observationService.update(id, updateObservationDto, req.user.userId);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Req() req,@Param('id') id: string, @Query('api_key') api_key: string) {
    return this.observationService.remove(id, req.user.userId);
  }
}
