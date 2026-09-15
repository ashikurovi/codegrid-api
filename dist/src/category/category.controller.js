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
exports.CategoryController = void 0;
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const multer_1 = require("multer");
const category_service_1 = require("./category.service");
const create_category_dto_1 = require("./dto/create-category.dto");
const update_category_dto_1 = require("./dto/update-category.dto");
const storageConfig = (0, multer_1.memoryStorage)();
const fileFilterConfig = (req, file, callback) => {
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif|webp)$/)) {
        return callback(new common_1.BadRequestException('Only image files are allowed!'), false);
    }
    callback(null, true);
};
let CategoryController = class CategoryController {
    constructor(categoryService) {
        this.categoryService = categoryService;
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
    async create(createCategoryDto, file) {
        if (file) {
            createCategoryDto.picture = await this.uploadToImgbb(file);
        }
        const data = await this.categoryService.create(createCategoryDto);
        return {
            statusCode: common_1.HttpStatus.CREATED,
            message: 'Category created successfully',
            data,
        };
    }
    async findAll() {
        const data = await this.categoryService.findAll();
        return {
            statusCode: common_1.HttpStatus.OK,
            message: 'Categories retrieved successfully',
            data,
        };
    }
    async findOne(id) {
        const data = await this.categoryService.findOne(+id);
        return {
            statusCode: common_1.HttpStatus.OK,
            message: 'Category retrieved successfully',
            data,
        };
    }
    async update(id, updateCategoryDto, file) {
        if (file) {
            updateCategoryDto.picture = await this.uploadToImgbb(file);
        }
        const data = await this.categoryService.update(+id, updateCategoryDto);
        return {
            statusCode: common_1.HttpStatus.OK,
            message: 'Category updated successfully',
            data,
        };
    }
    async remove(id) {
        await this.categoryService.remove(+id);
        return {
            statusCode: common_1.HttpStatus.OK,
            message: 'Category deleted successfully',
        };
    }
};
exports.CategoryController = CategoryController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('picture', { storage: storageConfig, fileFilter: fileFilterConfig })),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_category_dto_1.CreateCategoryDto, Object]),
    __metadata("design:returntype", Promise)
], CategoryController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], CategoryController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CategoryController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('picture', { storage: storageConfig, fileFilter: fileFilterConfig })),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_category_dto_1.UpdateCategoryDto, Object]),
    __metadata("design:returntype", Promise)
], CategoryController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CategoryController.prototype, "remove", null);
exports.CategoryController = CategoryController = __decorate([
    (0, common_1.Controller)('category'),
    __metadata("design:paramtypes", [category_service_1.CategoryService])
], CategoryController);
//# sourceMappingURL=category.controller.js.map