import { IsEnum, IsNumber, IsOptional, IsString, Min, IsBoolean, IsDateString } from 'class-validator';
import { CouponDiscountType } from '../entities/coupon.entity';

export class CreateCouponDto {
  @IsString()
  code: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsEnum(CouponDiscountType)
  discountType: CouponDiscountType;

  @IsNumber()
  @Min(0)
  value: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  minOrderAmount?: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  maxDiscount?: number;

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;

  @IsOptional()
  @IsNumber()
  @Min(0)
  usageLimit?: number;

  @IsOptional()
  @IsDateString()
  expiresAt?: string;
}
