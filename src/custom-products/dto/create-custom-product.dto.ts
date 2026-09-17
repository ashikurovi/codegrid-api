import { IsString, IsEnum, IsOptional, IsArray, ValidateNested, IsNumber } from 'class-validator';
import { Type } from 'class-transformer';
import { CustomProductCategory, CustomProductStatus } from '../entities/custom-product.entity';

class PackageItemDto {
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  imageUrl?: string;
}

export class CreateCustomProductDto {
  @IsString()
  productName: string;

  @IsEnum(CustomProductCategory)
  category: CustomProductCategory;

  @IsString()
  price: string;

  @IsOptional()
  @IsNumber()
  dtfPrintCost?: number;

  @IsOptional()
  @IsNumber()
  a4PrintCost?: number;

  @IsEnum(CustomProductStatus)
  status: CustomProductStatus;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  discount?: string;

  @IsOptional()
  @IsString()
  image?: string;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => PackageItemDto)
  packageItems?: PackageItemDto[];
}
