import { Likes } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

export class LikeEntity implements Likes {
  @ApiProperty()
  id: number;

  @ApiProperty()
  userId: number;

  @ApiProperty()
  imageId: number;
}
