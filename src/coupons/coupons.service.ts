import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Coupon, CouponDiscountType } from './entities/coupon.entity';
import { CreateCouponDto } from './dto/create-coupon.dto';
import { UpdateCouponDto } from './dto/update-coupon.dto';

@Injectable()
export class CouponsService {
  constructor(
    @InjectRepository(Coupon)
    private readonly couponRepository: Repository<Coupon>,
  ) {}

  async create(createCouponDto: CreateCouponDto): Promise<Coupon> {
    const normalizedCode = createCouponDto.code.trim().toUpperCase();

    const existing = await this.couponRepository.findOne({ where: { code: normalizedCode } });
    if (existing) {
      throw new BadRequestException('Coupon code already exists');
    }

    const coupon = this.couponRepository.create({
      ...createCouponDto,
      code: normalizedCode,
      isActive: createCouponDto.isActive ?? true,
      minOrderAmount: createCouponDto.minOrderAmount ?? 0,
    });

    return await this.couponRepository.save(coupon);
  }

  async findAll(): Promise<Coupon[]> {
    return await this.couponRepository.find({
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: number): Promise<Coupon> {
    const coupon = await this.couponRepository.findOne({ where: { id } });
    if (!coupon) {
      throw new NotFoundException(`Coupon with ID ${id} not found`);
    }
    return coupon;
  }

  async update(id: number, updateCouponDto: UpdateCouponDto): Promise<Coupon> {
    const coupon = await this.findOne(id);

    if (updateCouponDto.code) {
      updateCouponDto.code = updateCouponDto.code.trim().toUpperCase();
    }

    const mergedCoupon = this.couponRepository.merge(coupon, updateCouponDto);
    return await this.couponRepository.save(mergedCoupon);
  }

  async remove(id: number): Promise<void> {
    const coupon = await this.findOne(id);
    await this.couponRepository.remove(coupon);
  }

  async validateCoupon(code: string, subtotal: number): Promise<{ valid: boolean; message?: string; discount?: number; coupon?: Partial<Coupon> }> {
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
    if (coupon.discountType === CouponDiscountType.PERCENTAGE) {
      discount = Number(((subtotal * Number(coupon.value)) / 100).toFixed(2));
      if (coupon.maxDiscount && discount > Number(coupon.maxDiscount)) {
        discount = Number(coupon.maxDiscount);
      }
    } else {
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
}
