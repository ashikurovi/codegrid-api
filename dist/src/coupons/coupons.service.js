"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CouponsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const coupon_entity_1 = require("./entities/coupon.entity");
let CouponsService = class CouponsService {
    constructor(couponRepository) {
        this.couponRepository = couponRepository;
    }
    async create(createCouponDto) {
        const normalizedCode = createCouponDto.code.trim().toUpperCase();
        const existing = await this.couponRepository.findOne({ where: { code: normalizedCode } });
        if (existing) {
            throw new common_1.BadRequestException('Coupon code already exists');
        }
        const coupon = this.couponRepository.create({
            ...createCouponDto,
            code: normalizedCode,
            isActive: createCouponDto.isActive ?? true,
            minOrderAmount: createCouponDto.minOrderAmount ?? 0,
        });
        return await this.couponRepository.save(coupon);
    }
    async findAll() {
        return await this.couponRepository.find({
            order: { createdAt: 'DESC' },
        });
    }
    async findOne(id) {
        const coupon = await this.couponRepository.findOne({ where: { id } });
        if (!coupon) {
            throw new common_1.NotFoundException(`Coupon with ID ${id} not found`);
        }
        return coupon;
    }
    async update(id, updateCouponDto) {
        const coupon = await this.findOne(id);
        if (updateCouponDto.code) {
            updateCouponDto.code = updateCouponDto.code.trim().toUpperCase();
        }
        const mergedCoupon = this.couponRepository.merge(coupon, updateCouponDto);
        return await this.couponRepository.save(mergedCoupon);
    }
    async remove(id) {
        const coupon = await this.findOne(id);
        await this.couponRepository.remove(coupon);
    }
    async validateCoupon(code, subtotal) {
        const normalized = code.trim().toUpperCase();
        if (!normalized) {
            return { valid: false, message: 'Coupon code is required' };
        }
        const coupon = await this.couponRepository.findOne({ where: { code: normalized } });
        if (!coupon) {
            return { valid: false, message: 'Coupon not found' };
        }
        if (!coupon.isActive) {
            return { valid: false, message: 'This coupon is no longer active' };
        }
        const now = new Date();
        if (coupon.expiresAt && new Date(coupon.expiresAt) < now) {
            return { valid: false, message: 'This coupon has expired' };
        }
        if (Number(coupon.minOrderAmount) > 0 && subtotal < Number(coupon.minOrderAmount)) {
            return {
                valid: false,
                message: `Minimum order amount for this coupon is ৳${Number(coupon.minOrderAmount)}`,
            };
        }
        if (coupon.usageLimit && coupon.usageCount >= coupon.usageLimit) {
            return { valid: false, message: 'This coupon has reached its usage limit' };
        }
        let discount = 0;
        if (coupon.discountType === coupon_entity_1.CouponDiscountType.PERCENTAGE) {
            discount = Number(((subtotal * Number(coupon.value)) / 100).toFixed(2));
            if (coupon.maxDiscount && discount > Number(coupon.maxDiscount)) {
                discount = Number(coupon.maxDiscount);
            }
        }
        else {
            discount = Number(coupon.value);
        }
        if (discount < 0) {
            discount = 0;
        }
        return {
            valid: true,
            discount,
            message: 'Coupon applied successfully',
            coupon: {
                id: coupon.id,
                code: coupon.code,
                description: coupon.description,
                discountType: coupon.discountType,
                value: coupon.value,
                maxDiscount: coupon.maxDiscount,
                minOrderAmount: coupon.minOrderAmount,
            },
        };
    }
};
exports.CouponsService = CouponsService;
exports.CouponsService = CouponsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(coupon_entity_1.Coupon)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], CouponsService);
//# sourceMappingURL=coupons.service.js.map