import { ApiProperty } from '@nestjs/swagger';

export class UploadImageDto {
  @ApiProperty()
  description: string;

  @ApiProperty()
  date: string;

  @ApiProperty()
  userId: number;
}
