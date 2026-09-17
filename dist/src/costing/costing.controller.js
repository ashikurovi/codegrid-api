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
exports.CostingController = void 0;
const common_1 = require("@nestjs/common");
const costing_service_1 = require("./costing.service");
const create_costing_dto_1 = require("./dto/create-costing.dto");
const update_costing_dto_1 = require("./dto/update-costing.dto");
let CostingController = class CostingController {
    constructor(costingService) {
        this.costingService = costingService;
    }
    create(dto) {
        return this.costingService.create(dto);
    }
    async findAll() {
        return {
            statusCode: common_1.HttpStatus.OK,
            message: 'Costing records retrieved successfully',
            data: await this.costingService.findAll(),
        };
    }
    async getSummary() {
        return {
            statusCode: common_1.HttpStatus.OK,
            message: 'Costing summary retrieved successfully',
            data: await this.costingService.getSummary(),
        };
    }
    async findOne(id) {
        return {
            statusCode: common_1.HttpStatus.OK,
            message: 'Costing record retrieved successfully',
            data: await this.costingService.findOne(+id),
        };
    }
    async update(id, dto) {
        return {
            statusCode: common_1.HttpStatus.OK,
            message: 'Costing record updated successfully',
            data: await this.costingService.update(+id, dto),
        };
    }
    async remove(id) {
        await this.costingService.remove(+id);
        return {
            statusCode: common_1.HttpStatus.OK,
            message: 'Costing record deleted successfully',
        };
    }
};
exports.CostingController = CostingController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_costing_dto_1.CreateCostingDto]),
    __metadata("design:returntype", void 0)
], CostingController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], CostingController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('summary'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], CostingController.prototype, "getSummary", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CostingController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_costing_dto_1.UpdateCostingDto]),
    __metadata("design:returntype", Promise)
], CostingController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CostingController.prototype, "remove", null);
exports.CostingController = CostingController = __decorate([
    (0, common_1.Controller)('costing'),
    __metadata("design:paramtypes", [costing_service_1.CostingService])
], CostingController);
//# sourceMappingURL=costing.controller.js.map