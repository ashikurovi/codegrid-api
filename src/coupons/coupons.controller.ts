import { Controller, Get, Post, Body, Patch, Param, Delete, Query, HttpCode, HttpStatus, BadRequestException } from '@nestjs/common';
import { CouponsService } from './coupons.service';
import { CreateCouponDto } from './dto/create-coupon.dto';
import { UpdateCouponDto } from './dto/update-coupon.dto';

@Controller('coupons')
export class CouponsController {
  constructor(private readonly couponsService: CouponsService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createCouponDto: CreateCouponDto) {
    const data = await this.couponsService.create(createCouponDto);
    return {
      statusCode: HttpStatus.CREATED,
      message: 'Coupon created successfully',
      data,
    };
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  async findAll() {
    const data = await this.couponsService.findAll();
    return {
      statusCode: HttpStatus.OK,
      message: 'Coupons retrieved successfully',
      data,
    };
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async findOne(@Param('id') id: string) {
    const data = await this.couponsService.findOne(+id);
    return {
      statusCode: HttpStatus.OK,
      message: 'Coupon retrieved successfully',
      data,
    };
  }

  @Post('validate')
  @HttpCode(HttpStatus.OK)
  async validateCoupon(
    @Body() body: { code: string; subtotal: number },
  ) {
    if (!body?.code || typeof body.subtotal !== 'number') {
      throw new BadRequestException('Coupon code and subtotal are required');
    }

    const data = await this.couponsService.validateCoupon(body.code, body.subtotal);
    return {
      statusCode: HttpStatus.OK,
      message: 'Coupon validated successfully',
      data,
    };
  }

  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  async update(@Param('id') id: string, @Body() updateCouponDto: UpdateCouponDto) {
    const data = await this.couponsService.update(+id, updateCouponDto);
    return {
      statusCode: HttpStatus.OK,
      message: 'Coupon updated successfully',
      data,
    };
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  async remove(@Param('id') id: string) {
    await this.couponsService.remove(+id);
    return {
      statusCode: HttpStatus.OK,
      message: 'Coupon deleted successfully',
    };
  }
}
