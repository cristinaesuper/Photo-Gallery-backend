import { Body, Delete, Injectable, Param, Post } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateLikeDto } from './dto/create-like.dto';

@Injectable()
export class LikesService {
  constructor(private prisma: PrismaService) {}

  @Post()
  async create(@Body() createLikeDto: CreateLikeDto) {
    await this.prisma.likes.create({ data: createLikeDto });
  }

  async findAllLikesByUserId(userId: number) {
    return this.prisma.likes.findMany({
      where: { userId },
    });
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.prisma.likes.delete({ where: { id } });
  }
}
