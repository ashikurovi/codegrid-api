import { CouponDiscountType } from '../entities/coupon.entity';
export declare class CreateCouponDto {
    code: string;
    description?: string;
    discountType: CouponDiscountType;
    value: number;
    minOrderAmount?: number;
    maxDiscount?: number;
    isActive?: boolean;
    usageLimit?: number;
    expiresAt?: string;
}
