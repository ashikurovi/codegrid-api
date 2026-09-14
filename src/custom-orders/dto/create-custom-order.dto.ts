import { IsString, IsNumber, IsOptional, IsEnum, Min } from 'class-validator';
import { CustomOrderStatus } from '../entities/custom-order.entity';

export class CreateCustomOrderDto {
  @IsOptional()
  @IsNumber()
  userId?: number;

  @IsOptional()
  @IsNumber()
  customProductId?: number;

  @IsOptional()
  @IsString()
  customerName?: string;

  @IsOptional()
  @IsString()
  customerPhone?: string;

  @IsOptional()
  @IsString()
  customerEmail?: string;

  @IsString()
  category: string;

  @IsString()
  item: string;

  @IsNumber()
  @Min(1)
  quantity: number;

  @IsOptional()
  @IsString()
  details?: string;

  @IsOptional()
  @IsString()
  designReference?: string;

  @IsOptional()
  @IsEnum(CustomOrderStatus)
  status?: CustomOrderStatus;

  @IsOptional()
  @IsNumber()
  price?: number;
}
