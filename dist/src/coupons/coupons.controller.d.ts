import { HttpStatus } from '@nestjs/common';
import { CouponsService } from './coupons.service';
import { CreateCouponDto } from './dto/create-coupon.dto';
import { UpdateCouponDto } from './dto/update-coupon.dto';
export declare class CouponsController {
    private readonly couponsService;
    constructor(couponsService: CouponsService);
    create(createCouponDto: CreateCouponDto): Promise<{
        statusCode: HttpStatus;
        message: string;
        data: import("./entities/coupon.entity").Coupon;
    }>;
    findAll(): Promise<{
        statusCode: HttpStatus;
        message: string;
        data: import("./entities/coupon.entity").Coupon[];
    }>;
    findOne(id: string): Promise<{
        statusCode: HttpStatus;
        message: string;
        data: import("./entities/coupon.entity").Coupon;
    }>;
    validateCoupon(body: {
        code: string;
        subtotal: number;
    }): Promise<{
        statusCode: HttpStatus;
        message: string;
        data: {
            valid: boolean;
            message?: string;
            discount?: number;
            coupon?: Partial<import("./entities/coupon.entity").Coupon>;
        };
    }>;
    update(id: string, updateCouponDto: UpdateCouponDto): Promise<{
        statusCode: HttpStatus;
        message: string;
        data: import("./entities/coupon.entity").Coupon;
    }>;
    remove(id: string): Promise<{
        statusCode: HttpStatus;
        message: string;
    }>;
}
