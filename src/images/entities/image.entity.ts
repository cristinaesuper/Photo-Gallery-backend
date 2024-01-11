import { Image } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

export class ImageEntity implements Image {
  @ApiProperty()
  id: number;

  @ApiProperty()
  url: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  date: string;

  @ApiProperty()
  userId: number;
}
