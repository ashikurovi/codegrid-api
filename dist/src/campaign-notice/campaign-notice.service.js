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
exports.CampaignNoticeService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const campaign_notice_entity_1 = require("./entities/campaign-notice.entity");
let CampaignNoticeService = class CampaignNoticeService {
    constructor(campaignNoticeRepository) {
        this.campaignNoticeRepository = campaignNoticeRepository;
    }
    async create(createCampaignNoticeDto) {
        const notice = this.campaignNoticeRepository.create(createCampaignNoticeDto);
        return await this.campaignNoticeRepository.save(notice);
    }
    async findAll() {
        return await this.campaignNoticeRepository.find({
            order: { createdAt: 'DESC' },
        });
    }
    async findOne(id) {
        const notice = await this.campaignNoticeRepository.findOne({ where: { id } });
        if (!notice) {
            throw new common_1.NotFoundException(`Campaign Notice #${id} not found`);
        }
        return notice;
    }
    async update(id, updateCampaignNoticeDto) {
        const notice = await this.findOne(id);
        Object.assign(notice, updateCampaignNoticeDto);
        return await this.campaignNoticeRepository.save(notice);
    }
    async remove(id) {
        const notice = await this.findOne(id);
        await this.campaignNoticeRepository.remove(notice);
    }
};
exports.CampaignNoticeService = CampaignNoticeService;
exports.CampaignNoticeService = CampaignNoticeService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(campaign_notice_entity_1.CampaignNotice)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], CampaignNoticeService);
//# sourceMappingURL=campaign-notice.service.js.map