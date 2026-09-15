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
exports.CustomProductsController = void 0;
const common_1 = require("@nestjs/common");
const custom_products_service_1 = require("./custom-products.service");
const create_custom_product_dto_1 = require("./dto/create-custom-product.dto");
const update_custom_product_dto_1 = require("./dto/update-custom-product.dto");
let CustomProductsController = class CustomProductsController {
    constructor(customProductsService) {
        this.customProductsService = customProductsService;
    }
    async create(createCustomProductDto) {
        const data = await this.customProductsService.create(createCustomProductDto);
        return {
            statusCode: common_1.HttpStatus.CREATED,
            message: 'Custom product created successfully',
            data,
        };
    }
    async findAll() {
        const data = await this.customProductsService.findAll();
        return {
            statusCode: common_1.HttpStatus.OK,
            message: 'Custom products retrieved successfully',
            data,
        };
    }
    async findOne(id) {
        const data = await this.customProductsService.findOne(+id);
        return {
            statusCode: common_1.HttpStatus.OK,
            message: 'Custom product retrieved successfully',
            data,
        };
    }
    async update(id, updateCustomProductDto) {
        const data = await this.customProductsService.update(+id, updateCustomProductDto);
        return {
            statusCode: common_1.HttpStatus.OK,
            message: 'Custom product updated successfully',
            data,
        };
    }
    async remove(id) {
        await this.customProductsService.remove(+id);
        return {
            statusCode: common_1.HttpStatus.OK,
            message: 'Custom product deleted successfully',
        };
    }
};
exports.CustomProductsController = CustomProductsController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_custom_product_dto_1.CreateCustomProductDto]),
    __metadata("design:returntype", Promise)
], CustomProductsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], CustomProductsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CustomProductsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_custom_product_dto_1.UpdateCustomProductDto]),
    __metadata("design:returntype", Promise)
], CustomProductsController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CustomProductsController.prototype, "remove", null);
exports.CustomProductsController = CustomProductsController = __decorate([
    (0, common_1.Controller)('custom-products'),
    __metadata("design:paramtypes", [custom_products_service_1.CustomProductsService])
], CustomProductsController);
//# sourceMappingURL=custom-products.controller.js.map