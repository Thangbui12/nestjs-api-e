import {
  IsDate,
  IsDateString,
  IsEmail,
  IsNotEmpty,
  IsString,
  Length,
} from 'class-validator';

export class EmailScheduleDto {
  @IsDate()
  readonly date: Date;

  @IsEmail()
  @Length(6, 255)
  @IsNotEmpty()
  readonly recipient: string;

  @IsString()
  @Length(6, 255)
  @IsNotEmpty()
  readonly subject: string;

  @IsString()
  @Length(6, 255)
  @IsNotEmpty()
  readonly content: string;
}
