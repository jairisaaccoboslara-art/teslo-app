import {
  IsArray,
  IsNumber,
  IsPositive,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Transform, Type } from 'class-transformer';

class SaleItemDto {
  @IsString()
  productId: string;

  @IsString()
  title: string;

  @IsNumber()
  @IsPositive()
  @Transform(({ value }) => parseFloat(value))
  price: number;

  @IsNumber()
  @IsPositive()
  @Transform(({ value }) => parseInt(value))
  quantity: number;
}

export class CreateSaleDto {
  @IsNumber()
  @IsPositive()
  @Transform(({ value }) => parseFloat(value))
  total: number;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => SaleItemDto)
  items: SaleItemDto[];
}
