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
exports.BudgetPickService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const budget_pick_entity_1 = require("./entities/budget-pick.entity");
let BudgetPickService = class BudgetPickService {
    constructor(budgetPickRepository) {
        this.budgetPickRepository = budgetPickRepository;
    }
    async create(createBudgetPickDto) {
        const { productIds, ...rest } = createBudgetPickDto;
        const budgetPick = this.budgetPickRepository.create({
            ...rest,
            products: productIds?.length ? productIds.map(id => ({ id })) : undefined,
        });
        return await this.budgetPickRepository.save(budgetPick);
    }
    async findAll() {
        return await this.budgetPickRepository.find({
            relations: {
                products: true,
            }
        });
    }
    async findOne(id) {
        const budgetPick = await this.budgetPickRepository.findOne({
            where: { id },
            relations: {
                products: true,
            }
        });
        if (!budgetPick) {
            throw new common_1.NotFoundException(`BudgetPick with ID ${id} not found`);
        }
        return budgetPick;
    }
    async update(id, updateBudgetPickDto) {
        const budgetPick = await this.findOne(id);
        const { productIds, ...rest } = updateBudgetPickDto;
        const updatedData = { ...rest };
        if (productIds !== undefined) {
            updatedData.products = productIds?.length ? productIds.map(id => ({ id })) : [];
        }
        const updatedBudgetPick = this.budgetPickRepository.merge(budgetPick, updatedData);
        return await this.budgetPickRepository.save(updatedBudgetPick);
    }
    async remove(id) {
        const budgetPick = await this.findOne(id);
        await this.budgetPickRepository.remove(budgetPick);
    }
};
exports.BudgetPickService = BudgetPickService;
exports.BudgetPickService = BudgetPickService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(budget_pick_entity_1.BudgetPick)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], BudgetPickService);
//# sourceMappingURL=budget-pick.service.js.map