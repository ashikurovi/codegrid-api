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
exports.FeedbackService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const feedback_entity_1 = require("./entities/feedback.entity");
let FeedbackService = class FeedbackService {
    constructor(feedbackRepository) {
        this.feedbackRepository = feedbackRepository;
    }
    async create(createFeedbackDto) {
        const { userId, ...rest } = createFeedbackDto;
        const feedbackData = { ...rest };
        if (userId) {
            feedbackData.user = { id: userId };
        }
        const feedback = this.feedbackRepository.create(feedbackData);
        return await this.feedbackRepository.save(feedback);
    }
    async findAll() {
        return await this.feedbackRepository.find({
            relations: { user: true },
            order: { createdAt: 'DESC' },
        });
    }
    async findOne(id) {
        const feedback = await this.feedbackRepository.findOne({
            where: { id },
            relations: { user: true },
        });
        if (!feedback) {
            throw new common_1.NotFoundException(`Feedback with ID ${id} not found`);
        }
        return feedback;
    }
    async update(id, updateFeedbackDto) {
        const feedback = await this.findOne(id);
        const { userId, ...rest } = updateFeedbackDto;
        if (userId !== undefined) {
            feedback.user = userId ? { id: userId } : null;
        }
        Object.assign(feedback, rest);
        return await this.feedbackRepository.save(feedback);
    }
    async remove(id) {
        const feedback = await this.findOne(id);
        await this.feedbackRepository.remove(feedback);
    }
};
exports.FeedbackService = FeedbackService;
exports.FeedbackService = FeedbackService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(feedback_entity_1.Feedback)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], FeedbackService);
//# sourceMappingURL=feedback.service.js.map