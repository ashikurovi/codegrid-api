import { IsString, IsNumber, IsOptional, IsArray, IsInt } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateProductDto {
  @IsString()
  title: string;

  @IsString()
  @IsOptional()
  sku?: string;

  @IsNumber()
  @Type(() => Number)
  originalPrice: number;

  @IsNumber()
  @Type(() => Number)
  currentPrice: number;

  @IsString()
  @IsOptional()
  variantLabel?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  @IsOptional()
  additionalInfo?: string;

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  features?: string[];

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  images?: string[];

  @IsString()
  @IsOptional()
  thumbnail?: string;

  @IsArray()
  @IsInt({ each: true })
  @IsOptional()
  @Type(() => Number)
  sizeIds?: number[];

  @IsArray()
  @IsInt({ each: true })
  @IsOptional()
  @Type(() => Number)
  typeIds?: number[];

  @IsInt()
  @IsOptional()
  @Type(() => Number)
  categoryId?: number;

  @IsInt()
  @IsOptional()
  @Type(() => Number)
  subCategoryId?: number;

  @IsInt()
  @IsOptional()
  @Type(() => Number)
  brandId?: number;
}
