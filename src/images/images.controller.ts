import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer'
import { ImagesService } from './images.service';
import { UpdateImageDto } from './dto/update-image.dto';
import { UploadImageDto } from './dto/upload-image.dto';
import { ImageEntity } from './entities/image.entity';
import { CreateImageDto } from './dto/create-image.dto';

@Controller('images')
@ApiTags('images')
export class ImagesController {
  constructor(private readonly imagesService: ImagesService) {}

  @Post()
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, cb) => {
          cb(null, `${file.originalname}`);
        },
      }),
    }),
  )
  async uploadFile(@UploadedFile() file, @Body() uploadImageDto: UploadImageDto) {
    const createImageDto: CreateImageDto = {
      url: file.filename,
      description: uploadImageDto.description,
      date: uploadImageDto.date,
      userId: +uploadImageDto.userId
    }
    return this.imagesService.create(createImageDto);
  }

  @Get()
  @ApiOkResponse({ type: ImageEntity, isArray: true })
  findAll() {
    return this.imagesService.findAll();
  }

  @Get(':userId')
  @ApiOkResponse({ type: ImageEntity, isArray: true })
  findAllImagesByUserId(@Param('userId') userId: string) {
    return this.imagesService.findAllImagesByUserId(+userId);
  }

  @Patch(':id')
  @ApiOkResponse({ type: ImageEntity })
  update(@Param('id') id: string, @Body() updateImageDto: UpdateImageDto) {
    return this.imagesService.update(+id, updateImageDto);
  }

  @Delete(':id')
  @ApiOkResponse({ type: ImageEntity })
  remove(@Param('id') id: string) {
    return this.imagesService.remove(+id);
  }
}
