import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { UsersModule } from './users/users.module';
import { ImagesModule } from './images/images.module';
import { LikesModule } from './likes/likes.module';

@Module({
  imports: [PrismaModule, UsersModule, ImagesModule, LikesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
