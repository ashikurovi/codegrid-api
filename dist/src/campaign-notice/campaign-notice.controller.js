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
exports.CampaignNoticeController = void 0;
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const multer_1 = require("multer");
const campaign_notice_service_1 = require("./campaign-notice.service");
const create_campaign_notice_dto_1 = require("./dto/create-campaign-notice.dto");
const update_campaign_notice_dto_1 = require("./dto/update-campaign-notice.dto");
const storageConfig = (0, multer_1.memoryStorage)();
const fileFilterConfig = (req, file, callback) => {
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif|webp)$/)) {
        return callback(new common_1.BadRequestException('Only image files are allowed!'), false);
    }
    callback(null, true);
};
let CampaignNoticeController = class CampaignNoticeController {
    constructor(campaignNoticeService) {
        this.campaignNoticeService = campaignNoticeService;
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
    async create(createCampaignNoticeDto, file) {
        if (file) {
            createCampaignNoticeDto.image = await this.uploadToImgbb(file);
        }
        const data = await this.campaignNoticeService.create(createCampaignNoticeDto);
        return {
            statusCode: common_1.HttpStatus.CREATED,
            message: 'Campaign notice created successfully',
            data,
        };
    }
    async findAll() {
        const data = await this.campaignNoticeService.findAll();
        return {
            statusCode: common_1.HttpStatus.OK,
            message: 'Campaign notices retrieved successfully',
            data,
        };
    }
    async findOne(id) {
        const data = await this.campaignNoticeService.findOne(+id);
        return {
            statusCode: common_1.HttpStatus.OK,
            message: 'Campaign notice retrieved successfully',
            data,
        };
    }
    async update(id, updateCampaignNoticeDto, file) {
        if (file) {
            updateCampaignNoticeDto.image = await this.uploadToImgbb(file);
        }
        const data = await this.campaignNoticeService.update(+id, updateCampaignNoticeDto);
        return {
            statusCode: common_1.HttpStatus.OK,
            message: 'Campaign notice updated successfully',
            data,
        };
    }
    async remove(id) {
        await this.campaignNoticeService.remove(+id);
        return {
            statusCode: common_1.HttpStatus.OK,
            message: 'Campaign notice deleted successfully',
        };
    }
};
exports.CampaignNoticeController = CampaignNoticeController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('image', { storage: storageConfig, fileFilter: fileFilterConfig })),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_campaign_notice_dto_1.CreateCampaignNoticeDto, Object]),
    __metadata("design:returntype", Promise)
], CampaignNoticeController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], CampaignNoticeController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CampaignNoticeController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('image', { storage: storageConfig, fileFilter: fileFilterConfig })),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_campaign_notice_dto_1.UpdateCampaignNoticeDto, Object]),
    __metadata("design:returntype", Promise)
], CampaignNoticeController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CampaignNoticeController.prototype, "remove", null);
exports.CampaignNoticeController = CampaignNoticeController = __decorate([
    (0, common_1.Controller)('campaign-notice'),
    __metadata("design:paramtypes", [campaign_notice_service_1.CampaignNoticeService])
], CampaignNoticeController);
//# sourceMappingURL=campaign-notice.controller.js.map