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
exports.ProductsController = void 0;
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const multer_1 = require("multer");
const products_service_1 = require("./products.service");
const create_product_dto_1 = require("./dto/create-product.dto");
const update_product_dto_1 = require("./dto/update-product.dto");
const storageConfig = (0, multer_1.memoryStorage)();
const fileFilterConfig = (req, file, callback) => {
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif|webp)$/)) {
        return callback(new common_1.BadRequestException('Only image files are allowed!'), false);
    }
    callback(null, true);
};
let ProductsController = class ProductsController {
    constructor(productsService) {
        this.productsService = productsService;
        this.IMGBB_API_KEY = '23426686fef26255161e09873534cdf6';
    }
    async uploadToImgbb(file) {
        const base64Image = file.buffer.toString('base64');
        const formData = new URLSearchParams();
        formData.append('image', base64Image);
        const response = await fetch(`https://api.imgbb.com/1/upload?key=${this.IMGBB_API_KEY}`, {
            method: 'POST',
            body: formData,
        });
        const data = await response.json();
        if (data.success) {
            return data.data.url;
        }
        else {
            throw new common_1.BadRequestException(data.error?.message || 'Failed to upload image to ImgBB');
        }
    }
    async create(createProductDto, files) {
        if (files?.thumbnail?.[0]) {
            createProductDto.thumbnail = await this.uploadToImgbb(files.thumbnail[0]);
        }
        if (files?.images?.length) {
            const uploadedImageUrls = await Promise.all(files.images.map(file => this.uploadToImgbb(file)));
            createProductDto.images = Array.isArray(createProductDto.images)
                ? [...createProductDto.images, ...uploadedImageUrls]
                : uploadedImageUrls;
        }
        const data = await this.productsService.create(createProductDto);
        return {
            statusCode: common_1.HttpStatus.CREATED,
            message: 'Product created successfully',
            data,
        };
    }
    async findAll() {
        const data = await this.productsService.findAll();
        return {
            statusCode: common_1.HttpStatus.OK,
            message: 'Products retrieved successfully',
            data,
        };
    }
    async findOne(id) {
        const data = await this.productsService.findOne(+id);
        return {
            statusCode: common_1.HttpStatus.OK,
            message: 'Product retrieved successfully',
            data,
        };
    }
    async update(id, updateProductDto, files) {
        if (files?.thumbnail?.[0]) {
            updateProductDto.thumbnail = await this.uploadToImgbb(files.thumbnail[0]);
        }
        if (files?.images?.length) {
            const uploadedImageUrls = await Promise.all(files.images.map(file => this.uploadToImgbb(file)));
            updateProductDto.images = Array.isArray(updateProductDto.images)
                ? [...updateProductDto.images, ...uploadedImageUrls]
                : uploadedImageUrls;
        }
        const data = await this.productsService.update(+id, updateProductDto);
        return {
            statusCode: common_1.HttpStatus.OK,
            message: 'Product updated successfully',
            data,
        };
    }
    async remove(id) {
        await this.productsService.remove(+id);
        return {
            statusCode: common_1.HttpStatus.OK,
            message: 'Product deleted successfully',
        };
    }
};
exports.ProductsController = ProductsController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileFieldsInterceptor)([
        { name: 'thumbnail', maxCount: 1 },
        { name: 'images', maxCount: 10 }
    ], { storage: storageConfig, fileFilter: fileFilterConfig })),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.UploadedFiles)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_product_dto_1.CreateProductDto, Object]),
    __metadata("design:returntype", Promise)
], ProductsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ProductsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ProductsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileFieldsInterceptor)([
        { name: 'thumbnail', maxCount: 1 },
        { name: 'images', maxCount: 10 }
    ], { storage: storageConfig, fileFilter: fileFilterConfig })),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.UploadedFiles)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_product_dto_1.UpdateProductDto, Object]),
    __metadata("design:returntype", Promise)
], ProductsController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ProductsController.prototype, "remove", null);
exports.ProductsController = ProductsController = __decorate([
    (0, common_1.Controller)('products'),
    __metadata("design:paramtypes", [products_service_1.ProductsService])
], ProductsController);
//# sourceMappingURL=products.controller.js.map