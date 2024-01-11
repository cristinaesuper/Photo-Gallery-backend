import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { LikesService } from './likes.service';
import { ImagesService } from '../images/images.service';
import { LikeEntity } from './entities/like.entity';
import { CreateLikeDto } from './dto/create-like.dto';

@Controller('likes')
@ApiTags('likes')
export class LikesController {
  constructor(private readonly likesService: LikesService,
              private readonly imageService: ImagesService) {}

  @Post()
  @ApiCreatedResponse({ type: LikeEntity })
  async create(@Body() createLikeDto: CreateLikeDto) {
    return this.likesService.create(createLikeDto);
  }

  @Get('user/:userId')
  @ApiOkResponse({ type: LikeEntity, isArray: true })
  async findAllLikesByUserId(@Param('userId') userId: string) {
    const likes = await this.likesService.findAllLikesByUserId(+userId);
    const likedImageIds = likes.map((like) => like.imageId);

    return this.imageService.findImagesBasedOnIds(likedImageIds);
  }

  @Delete(':id')
  @ApiOkResponse({ type: LikeEntity })
  remove(@Param('id') id: string) {
    return this.likesService.remove(+id);
  }
}
