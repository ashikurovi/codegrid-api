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
exports.CouponsController = void 0;
const common_1 = require("@nestjs/common");
const coupons_service_1 = require("./coupons.service");
const create_coupon_dto_1 = require("./dto/create-coupon.dto");
const update_coupon_dto_1 = require("./dto/update-coupon.dto");
let CouponsController = class CouponsController {
    constructor(couponsService) {
        this.couponsService = couponsService;
    }
    async create(createCouponDto) {
        const data = await this.couponsService.create(createCouponDto);
        return {
            statusCode: common_1.HttpStatus.CREATED,
            message: 'Coupon created successfully',
            data,
        };
    }
    async findAll() {
        const data = await this.couponsService.findAll();
        return {
            statusCode: common_1.HttpStatus.OK,
            message: 'Coupons retrieved successfully',
            data,
        };
    }
    async findOne(id) {
        const data = await this.couponsService.findOne(+id);
        return {
            statusCode: common_1.HttpStatus.OK,
            message: 'Coupon retrieved successfully',
            data,
        };
    }
    async validateCoupon(body) {
        if (!body?.code || typeof body.subtotal !== 'number') {
            throw new common_1.BadRequestException('Coupon code and subtotal are required');
        }
        const data = await this.couponsService.validateCoupon(body.code, body.subtotal);
        return {
            statusCode: common_1.HttpStatus.OK,
            message: 'Coupon validated successfully',
            data,
        };
    }
    async update(id, updateCouponDto) {
        const data = await this.couponsService.update(+id, updateCouponDto);
        return {
            statusCode: common_1.HttpStatus.OK,
            message: 'Coupon updated successfully',
            data,
        };
    }
    async remove(id) {
        await this.couponsService.remove(+id);
        return {
            statusCode: common_1.HttpStatus.OK,
            message: 'Coupon deleted successfully',
        };
    }
};
exports.CouponsController = CouponsController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_coupon_dto_1.CreateCouponDto]),
    __metadata("design:returntype", Promise)
], CouponsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], CouponsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CouponsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Post)('validate'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CouponsController.prototype, "validateCoupon", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_coupon_dto_1.UpdateCouponDto]),
    __metadata("design:returntype", Promise)
], CouponsController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CouponsController.prototype, "remove", null);
exports.CouponsController = CouponsController = __decorate([
    (0, common_1.Controller)('coupons'),
    __metadata("design:paramtypes", [coupons_service_1.CouponsService])
], CouponsController);
//# sourceMappingURL=coupons.controller.js.map