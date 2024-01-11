import { Body, Delete, Get, Injectable, Param, Patch, Post } from '@nestjs/common';
import { ApiOkResponse } from '@nestjs/swagger';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateImageDto } from './dto/create-image.dto';
import { UpdateImageDto } from './dto/update-image.dto';
import { ImageEntity } from './entities/image.entity';

@Injectable()
export class ImagesService {
  constructor(private prisma: PrismaService) {}

  @Post()
  create(@Body() createImageDto: CreateImageDto) {
    return this.prisma.image.create({ data: createImageDto });
  }

  async find() {
    return this.prisma.image.findMany();
  }

  @Get()
  @ApiOkResponse({ type: ImageEntity, isArray: true })
  async findAll() {
    const images = await this.find();

    const imageEntities: ImageEntity[] = images.map((image: any) => {
      return {
        id: image.id,
        url: `http://localhost:3000/uploads/${image.url}`,
        description: image.description,
        date: image.date,
        userId: image.userId,
      };
    });

    return imageEntities;
  }

  async findBasedOnId(userId: number) {
    return this.prisma.image.findMany({
      where: { userId },
    });
  }

  @Get(':userId')
  @ApiOkResponse({ type: ImageEntity, isArray: true })
  async findAllImagesByUserId(userId: number) {
    const imagesByUser = await this.findBasedOnId(userId);

    const imageUrls = imagesByUser.map((image) => {
      return `http://localhost:3000/uploads/${image.url}`;
    });

    return imageUrls;
  }

  async findImagesBasedOnIds(ImageIds: number[]) {
    const imagesById = await this.prisma.image.findMany({
      where: { id: { in: ImageIds } }
    });

    const imageUrls = imagesById.map((image) => {
      return `http://localhost:3000/uploads/${image.url}`;
    });

    return imageUrls;
  }

  @Patch(':id')
  update(@Param('id') id: number, updateImageDto: UpdateImageDto) {
    return this.prisma.image.update({
      where: { id },
      data: updateImageDto
    });
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.prisma.image.delete({ where: { id } });
  }
}
