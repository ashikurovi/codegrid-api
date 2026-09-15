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
exports.IncompleteOrdersController = void 0;
const common_1 = require("@nestjs/common");
const incomplete_orders_service_1 = require("./incomplete-orders.service");
const create_incomplete_order_dto_1 = require("./dto/create-incomplete-order.dto");
const update_incomplete_order_dto_1 = require("./dto/update-incomplete-order.dto");
let IncompleteOrdersController = class IncompleteOrdersController {
    constructor(incompleteOrdersService) {
        this.incompleteOrdersService = incompleteOrdersService;
    }
    async create(createIncompleteOrderDto) {
        const data = await this.incompleteOrdersService.create(createIncompleteOrderDto);
        return {
            statusCode: common_1.HttpStatus.CREATED,
            message: 'Incomplete order logged successfully',
            data,
        };
    }
    async findAll() {
        const data = await this.incompleteOrdersService.findAll();
        return {
            statusCode: common_1.HttpStatus.OK,
            message: 'Incomplete orders retrieved successfully',
            data,
        };
    }
    async findOne(id) {
        const data = await this.incompleteOrdersService.findOne(+id);
        return {
            statusCode: common_1.HttpStatus.OK,
            message: 'Incomplete order retrieved successfully',
            data,
        };
    }
    async sendEmail(id) {
        const data = await this.incompleteOrdersService.triggerAbandonedCartEmail(+id);
        return {
            statusCode: common_1.HttpStatus.OK,
            message: data.message,
        };
    }
    async update(id, updateIncompleteOrderDto) {
        const data = await this.incompleteOrdersService.update(+id, updateIncompleteOrderDto);
        return {
            statusCode: common_1.HttpStatus.OK,
            message: 'Incomplete order updated successfully',
            data,
        };
    }
    async remove(id) {
        await this.incompleteOrdersService.remove(+id);
        return {
            statusCode: common_1.HttpStatus.OK,
            message: 'Incomplete order deleted successfully',
        };
    }
};
exports.IncompleteOrdersController = IncompleteOrdersController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_incomplete_order_dto_1.CreateIncompleteOrderDto]),
    __metadata("design:returntype", Promise)
], IncompleteOrdersController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], IncompleteOrdersController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], IncompleteOrdersController.prototype, "findOne", null);
__decorate([
    (0, common_1.Post)(':id/send-email'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], IncompleteOrdersController.prototype, "sendEmail", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_incomplete_order_dto_1.UpdateIncompleteOrderDto]),
    __metadata("design:returntype", Promise)
], IncompleteOrdersController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], IncompleteOrdersController.prototype, "remove", null);
exports.IncompleteOrdersController = IncompleteOrdersController = __decorate([
    (0, common_1.Controller)('incomplete-orders'),
    __metadata("design:paramtypes", [incomplete_orders_service_1.IncompleteOrdersService])
], IncompleteOrdersController);
//# sourceMappingURL=incomplete-orders.controller.js.map