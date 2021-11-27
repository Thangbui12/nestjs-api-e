import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNotEmpty } from 'class-validator';

export class DeleteImagesDto {
  @ApiProperty({
    example: [
      'Screenshot2021-11-18223413-1638008523267.png',
      'Screenshot2021-11-15084537-1638008523261.png',
    ],
    format: 'array',
    required: true,
  })
  @IsArray()
  @IsNotEmpty()
  readonly images: [string];
}
