import {
  Body,
  Controller,
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
import { diskStorage } from 'multer';
import * as path from 'path';
import { Roles } from 'src/user/decorator/roles.decorator';
import { UserRequired } from 'src/user/decorator/user-required.decorator';
import { Role, UserRequest } from 'src/user/model';
import { v4 as uuidv4 } from 'uuid';
import { CreatePublicationDto } from './dto';
import { PublicationService } from './publication.service';

export const storage = {
  storage: diskStorage({
    destination: './uploads/publications',
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
  constructor(private publicationService: PublicationService) {}

  @Roles(Role.Admin)
  @Get()
  async findAll() {
    return this.publicationService.findAll();
  }

  @UserRequired()
  @Get(':id')
  async findOne(@Request() { user }: UserRequest, @Param('id') id: string) {
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
    const publication = await this.publicationService.findByUserId(user.id);
    if (!publication) {
      throw new NotFoundException(
        'No se han encontrado publicaciones para el usuario indicado',
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

  @UserRequired()
  @Get(':id/image')
  async findPublicationImage(
    @Param('id') id: string,
    @Request() { user }: UserRequest,
    @Res() res: Response,
  ) {
    const publication = await this.publicationService.findOne(id);
    if (!publication) {
      throw new NotFoundException('Publicación no encontrada');
    }

    if (publication.user !== user.id) {
      throw new UnauthorizedException();
    }

    res.sendFile(
      path.join(process.cwd(), 'uploads/publications/' + publication.image),
    );
  }
}
