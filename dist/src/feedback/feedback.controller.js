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
exports.FeedbackController = void 0;
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const multer_1 = require("multer");
const feedback_service_1 = require("./feedback.service");
const create_feedback_dto_1 = require("./dto/create-feedback.dto");
const update_feedback_dto_1 = require("./dto/update-feedback.dto");
const storageConfig = (0, multer_1.memoryStorage)();
const fileFilterConfig = (req, file, callback) => {
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif|webp)$/)) {
        return callback(new common_1.BadRequestException('Only image files are allowed!'), false);
    }
    callback(null, true);
};
let FeedbackController = class FeedbackController {
    constructor(feedbackService) {
        this.feedbackService = feedbackService;
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
    async create(createFeedbackDto, file) {
        if (file) {
            createFeedbackDto.image = await this.uploadToImgbb(file);
        }
        const data = await this.feedbackService.create(createFeedbackDto);
        return {
            statusCode: common_1.HttpStatus.CREATED,
            message: 'Feedback logged successfully',
            data,
        };
    }
    async findAll() {
        const data = await this.feedbackService.findAll();
        return {
            statusCode: common_1.HttpStatus.OK,
            message: 'Feedback retrieved successfully',
            data,
        };
    }
    async findOne(id) {
        const data = await this.feedbackService.findOne(+id);
        return {
            statusCode: common_1.HttpStatus.OK,
            message: 'Feedback retrieved successfully',
            data,
        };
    }
    async update(id, updateFeedbackDto, file) {
        if (file) {
            updateFeedbackDto.image = await this.uploadToImgbb(file);
        }
        const data = await this.feedbackService.update(+id, updateFeedbackDto);
        return {
            statusCode: common_1.HttpStatus.OK,
            message: 'Feedback updated successfully',
            data,
        };
    }
    async remove(id) {
        await this.feedbackService.remove(+id);
        return {
            statusCode: common_1.HttpStatus.OK,
            message: 'Feedback deleted successfully',
        };
    }
};
exports.FeedbackController = FeedbackController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('image', { storage: storageConfig, fileFilter: fileFilterConfig })),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_feedback_dto_1.CreateFeedbackDto, Object]),
    __metadata("design:returntype", Promise)
], FeedbackController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], FeedbackController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], FeedbackController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('image', { storage: storageConfig, fileFilter: fileFilterConfig })),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_feedback_dto_1.UpdateFeedbackDto, Object]),
    __metadata("design:returntype", Promise)
], FeedbackController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], FeedbackController.prototype, "remove", null);
exports.FeedbackController = FeedbackController = __decorate([
    (0, common_1.Controller)('customer-feedback'),
    __metadata("design:paramtypes", [feedback_service_1.FeedbackService])
], FeedbackController);
//# sourceMappingURL=feedback.controller.js.map