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
exports.CostingService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const costing_entity_1 = require("./entities/costing.entity");
let CostingService = class CostingService {
    constructor(costingRepository) {
        this.costingRepository = costingRepository;
    }
    async create(dto) {
        const costing = this.costingRepository.create({
            note: dto.note ?? '',
            cost: Number(dto.cost || 0),
            reason: dto.reason ?? '',
        });
        return this.costingRepository.save(costing);
    }
    async findAll() {
        return this.costingRepository.find({
            order: { createdAt: 'DESC' },
        });
    }
    async findOne(id) {
        const costing = await this.costingRepository.findOne({
            where: { id },
        });
        if (!costing) {
            throw new common_1.NotFoundException(`Cost record with ID ${id} not found`);
        }
        return costing;
    }
    async update(id, dto) {
        const costing = await this.findOne(id);
        const updated = this.costingRepository.merge(costing, {
            note: dto.note !== undefined ? dto.note : costing.note,
            cost: dto.cost !== undefined ? Number(dto.cost) : Number(costing.cost || 0),
            reason: dto.reason !== undefined ? dto.reason : costing.reason,
        });
        return this.costingRepository.save(updated);
    }
    async remove(id) {
        const costing = await this.findOne(id);
        await this.costingRepository.remove(costing);
    }
    async getSummary() {
        const records = await this.costingRepository.find();
        const totalCost = records.reduce((sum, item) => sum + Number(item.cost || 0), 0);
        return {
            totalCost,
            recordsCount: records.length,
            records,
        };
    }
};
exports.CostingService = CostingService;
exports.CostingService = CostingService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(costing_entity_1.Costing)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], CostingService);
//# sourceMappingURL=costing.service.js.map