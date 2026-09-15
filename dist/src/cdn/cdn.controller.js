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
exports.CdnController = void 0;
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const multer_1 = require("multer");
let CdnController = class CdnController {
    constructor() {
        this.IMGBB_API_KEY = '23426686fef26255161e09873534cdf6';
    }
    async uploadFile(file) {
        if (!file) {
            throw new common_1.BadRequestException('File is required');
        }
        try {
            const base64Image = file.buffer.toString('base64');
            const formData = new URLSearchParams();
            formData.append('image', base64Image);
            const response = await fetch(`https://api.imgbb.com/1/upload?key=${this.IMGBB_API_KEY}`, {
                method: 'POST',
                body: formData,
            });
            const data = await response.json();
            if (data.success) {
                return {
                    statusCode: 201,
                    message: 'Image uploaded successfully',
                    data: {
                        url: data.data.url,
                        filename: file.originalname,
                        mimetype: file.mimetype,
                        size: file.size,
                    }
                };
            }
            else {
                throw new common_1.BadRequestException(data.error?.message || 'Failed to upload image to ImgBB');
            }
        }
        catch (error) {
            throw new common_1.BadRequestException('Image upload failed: ' + error.message);
        }
    }
};
exports.CdnController = CdnController;
__decorate([
    (0, common_1.Post)('upload'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('image', {
        storage: (0, multer_1.memoryStorage)(),
        fileFilter: (req, file, callback) => {
            if (!file.originalname.match(/\.(jpg|jpeg|png|gif|webp)$/)) {
                return callback(new common_1.BadRequestException('Only image files are allowed!'), false);
            }
            callback(null, true);
        },
    })),
    __param(0, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CdnController.prototype, "uploadFile", null);
exports.CdnController = CdnController = __decorate([
    (0, common_1.Controller)('cdn')
], CdnController);
//# sourceMappingURL=cdn.controller.js.map