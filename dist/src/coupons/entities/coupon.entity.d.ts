export declare enum CouponDiscountType {
    PERCENTAGE = "percentage",
    FIXED = "fixed"
}
export declare class Coupon {
    id: number;
    code: string;
    description: string;
    discountType: CouponDiscountType;
    value: number;
    minOrderAmount: number;
    maxDiscount: number;
    isActive: boolean;
    usageLimit: number;
    usageCount: number;
    expiresAt: Date;
    createdAt: Date;
    updatedAt: Date;
}
