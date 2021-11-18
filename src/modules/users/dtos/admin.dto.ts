import { IsOptional, IsString } from 'class-validator';

export class AdminFindUsersDto {
  @IsString()
  @IsOptional()
  keyword?: string;
}
