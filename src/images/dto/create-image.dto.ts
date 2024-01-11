import { ApiProperty } from '@nestjs/swagger';

export class CreateImageDto {
  @ApiProperty()
  url: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  date: string;

  @ApiProperty()
  userId: number;
}
