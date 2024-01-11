import { Body, Delete, Get, Injectable, Param, Patch, Post } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { ApiOkResponse } from '@nestjs/swagger';
import { UserEntity } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    await this.prisma.user.create({ data: createUserDto });
  }

  @Get()
  @ApiOkResponse({ type: UserEntity, isArray: true })
  findAll() {
    return this.prisma.user.findMany();
  }

  // @Get(':id')
  // @ApiOkResponse({ type: UserEntity })
  // findOne(id: number) {
  //   return this.prisma.user.findUnique({ where: { id } });
  // }

  async findAllImagesByUserId(userId: number) {
    return this.prisma.image.findMany({
      where: { userId },
    });
  }

  @Patch(':id')
  update(@Param('id') id: number, updateUserDto: UpdateUserDto) {
    return this.prisma.user.update({
      where: { id },
      data: updateUserDto
    });
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.prisma.user.delete({ where: { id } });
  }

  @Get(':email')
  @ApiOkResponse({ type: UserEntity })
  findOneByEmail(email: string) {
    return this.prisma.user.findUnique({
      where: { email },
      select: { id: true, email: true, name: true, password: true, admin: true }});
  }
}
