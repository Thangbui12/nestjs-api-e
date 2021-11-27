import { IsArray, IsNotEmpty } from 'class-validator';

export class UpdateVoucherUserDto {
  @IsArray()
  @IsNotEmpty()
  readonly vouchers: [];
}
