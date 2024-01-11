import { Module } from '@nestjs/common';
import { LikesService } from './likes.service';
import { LikesController } from './likes.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { ImagesService } from '../images/images.service';

@Module({
  controllers: [LikesController],
  providers: [LikesService, ImagesService],
  imports: [PrismaModule]
})
export class LikesModule {}
