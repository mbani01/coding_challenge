import { Controller, Get, Post, Body, Req, Patch, Param, Query, Delete, UseGuards, UseInterceptors, UploadedFile } from '@nestjs/common';
import { ObservationService } from './observation.service';
import { CreateObservationDto } from './dto/create-observation.dto';
import { UpdateObservationDto } from './dto/update-observation.dto';
import { JwtAuthGuard } from 'src/auth/jwt.guard';
import { ApiConsumes, ApiBody, ApiBearerAuth } from "@nestjs/swagger";
import { FileInterceptor } from "@nestjs/platform-express";

@Controller('observation')
export class ObservationController {
  constructor(private readonly observationService: ObservationService) {}

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT')
  @Post()
  create(@Req() req, @Body() createObservationDto: CreateObservationDto) {
   
    return this.observationService.create(createObservationDto, req.user.id);
  }

  @ApiBearerAuth('JWT')
  @UseGuards(JwtAuthGuard)
  @Get()
  findAll(@Req() req,) {
    return this.observationService.findAll(req.user.id);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT')
  @Get(':id')
  findOne(@Param('id') id: string, @Req() req, ) {
    return this.observationService.findOne(id, req.user.id);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT')
  @Patch(':id')
  update(@Req() req, @Param('id') id: string, @Body() updateObservationDto: UpdateObservationDto) {
    return this.observationService.update(id, updateObservationDto, req.user.id);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT')
  @Delete(':id')
  remove(@Req() req,@Param('id') id: string, ) {
    return this.observationService.remove(id, req.user.id);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT')
  @UseInterceptors(FileInterceptor('file'))
  @Post('/pictures')
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  async uploadPictures(@UploadedFile('file') file:Express.Multer.File, @Req() req, @Query('observationId') id: string)
  {
    return await this.observationService.updatePicture(id, file)
  }
}
