import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  Request,
  Res,
  UnauthorizedException,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Response } from 'express';
import * as fs from 'fs-extra';
import { diskStorage } from 'multer';
import * as path from 'path';
import { Public } from 'src/auth/decorator/public.decorator';
import { TripService } from 'src/trip/trip.service';
import { Roles } from 'src/user/decorator/roles.decorator';
import { UserRequired } from 'src/user/decorator/user-required.decorator';
import { Role, UserRequest } from 'src/user/model';
import { v4 as uuidv4 } from 'uuid';
import { CreatePublicationDto } from './dto';
import { PublicationService } from './publication.service';

const PATH = './uploads/publications';

export const storage = {
  storage: diskStorage({
    destination: PATH,
    filename: (req, file, cb) => {
      const filename: string =
        path.parse(file.originalname).name.replace(/\s/g, '') + uuidv4();
      const extension: string = path.parse(file.originalname).ext;
      cb(null, `${filename}${extension}`);
    },
  }),
};

@Controller('publication')
export class PublicationController {
  constructor(
    private publicationService: PublicationService,
    private tripService: TripService,
  ) {}

  @Roles(Role.Admin)
  @Get()
  async findAll() {
    return this.publicationService.findAll();
  }

  @UserRequired()
  @Get('detail/:id')
  async findOne(@Request() { user }: UserRequest, @Param('id') id: string) {
    // TODO: check this endpoint

    const publication = await this.publicationService.findOne(id);
    if (!publication) {
      throw new NotFoundException('Publicación no encontrada');
    }

    if (publication.user !== user.id) {
      throw new UnauthorizedException();
    }

    return publication;
  }

  @UserRequired()
  @Get('/user')
  async findAllByUserId(@Request() { user }: UserRequest) {
    const publications = await this.publicationService.findByUserId(user.id);
    if (!publications) {
      throw new NotFoundException(
        'No se han encontrado publicaciones para el usuario indicado',
      );
    }
    return publications;
  }

  @UserRequired()
  @Get('/user/trip/:id')
  async findAllByUserInTrip(
    @Param('id') id: string,
    @Request() { user }: UserRequest,
  ) {
    const publications = await this.publicationService.findByUserAndTripId(
      user.id,
      id,
    );
    if (!publications) {
      throw new NotFoundException(
        'No se han encontrado publicaciones para el usuario en el viaje indicado',
      );
    }
    return publications;
  }

  @UserRequired()
  @Get('/trip/:id')
  async findAllByTrip(
    @Param('id') id: string,
    @Request() { user }: UserRequest,
  ) {
    const trip = await this.tripService.findOne(id);
    if (!trip) {
      throw new NotFoundException('No se ha encontrado el viaje indicado');
    }

    if (!trip.users.includes(user.id)) {
      throw new UnauthorizedException(
        'No tienes permisos para ver las publicaciones de este viaje',
      );
    }

    const publication = await this.publicationService.findByTripId(id);
    if (!publication) {
      throw new NotFoundException(
        'No se han encontrado publicaciones para el viaje indicado',
      );
    }

    return publication;
  }

  @UserRequired()
  @Post()
  @UseInterceptors(FileInterceptor('image', storage))
  async create(
    @Request() { user }: UserRequest,
    @UploadedFile() image: Express.Multer.File,
    @Body() body: CreatePublicationDto,
  ) {
    // assign the user id to the publication
    body.user = user.id;
    body.image = image.filename;

    try {
      return await this.publicationService.create(body);
    } catch (error) {
      throw error;
    }
  }

  @Public()
  @Get(':id/image')
  async findPublicationImage(@Param('id') id: string, @Res() res: Response) {
    const publication = await this.publicationService.findOne(id);
    if (!publication) {
      throw new NotFoundException('Publicación no encontrada');
    }
    res.sendFile(path.join(process.cwd(), `${PATH}/` + publication.image));
  }

  @UserRequired()
  @Delete(':id')
  async delete(@Param('id') id: string, @Request() { user }: UserRequest) {
    const publication = await this.publicationService.findOne(id);
    if (!publication) {
      throw new NotFoundException('Publicación no encontrada');
    }

    if (user.role === Role.Student && publication.user !== user.id) {
      throw new UnauthorizedException();
    }

    const filePath = `./uploads/publications/${publication.image}`; // Adjust the file path as per your file naming convention
    try {
      await fs.remove(filePath);
    } catch (error) {
      throw new Error('Error deleting file');
    }

    return this.publicationService.delete(id);
  }
}
