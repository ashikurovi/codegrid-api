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
exports.OrdersController = void 0;
const common_1 = require("@nestjs/common");
const orders_service_1 = require("./orders.service");
const create_order_dto_1 = require("./dto/create-order.dto");
const update_order_dto_1 = require("./dto/update-order.dto");
const update_order_status_dto_1 = require("./dto/update-order-status.dto");
let OrdersController = class OrdersController {
    constructor(ordersService) {
        this.ordersService = ordersService;
    }
    async create(createOrderDto) {
        const data = await this.ordersService.create(createOrderDto);
        return {
            statusCode: common_1.HttpStatus.CREATED,
            message: 'Order created successfully',
            data,
        };
    }
    async findAll() {
        const data = await this.ordersService.findAll();
        return {
            statusCode: common_1.HttpStatus.OK,
            message: 'Orders retrieved successfully',
            data,
        };
    }
    async findAllByUser(userId) {
        const data = await this.ordersService.findAllByUser(+userId);
        return {
            statusCode: common_1.HttpStatus.OK,
            message: 'User orders retrieved successfully',
            data,
        };
    }
    async trackOrder(identifier) {
        const data = await this.ordersService.trackOrder(identifier);
        return {
            statusCode: common_1.HttpStatus.OK,
            message: 'Order tracking info retrieved successfully',
            data,
        };
    }
    async findOne(id) {
        const data = await this.ordersService.findOne(+id);
        return {
            statusCode: common_1.HttpStatus.OK,
            message: 'Order retrieved successfully',
            data,
        };
    }
    async createPreOrder(createOrderDto) {
        const data = await this.ordersService.createPreOrder(createOrderDto);
        return {
            statusCode: common_1.HttpStatus.CREATED,
            message: 'Pre-order created successfully',
            data,
        };
    }
    async convertPreOrder(id) {
        const data = await this.ordersService.convertPreOrder(+id);
        return {
            statusCode: common_1.HttpStatus.OK,
            message: 'Pre-order converted to confirmed order successfully',
            data,
        };
    }
    async updateStatus(id, updateOrderStatusDto) {
        const data = await this.ordersService.updateStatus(+id, updateOrderStatusDto.status);
        return {
            statusCode: common_1.HttpStatus.OK,
            message: 'Order status updated successfully',
            data,
        };
    }
    async update(id, updateOrderDto) {
        const data = await this.ordersService.update(+id, updateOrderDto);
        return {
            statusCode: common_1.HttpStatus.OK,
            message: 'Order updated successfully',
            data,
        };
    }
    async remove(id) {
        await this.ordersService.remove(+id);
        return {
            statusCode: common_1.HttpStatus.OK,
            message: 'Order deleted successfully',
        };
    }
};
exports.OrdersController = OrdersController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_order_dto_1.CreateOrderDto]),
    __metadata("design:returntype", Promise)
], OrdersController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], OrdersController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('user/:userId'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Param)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], OrdersController.prototype, "findAllByUser", null);
__decorate([
    (0, common_1.Get)('track/:identifier'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Param)('identifier')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], OrdersController.prototype, "trackOrder", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], OrdersController.prototype, "findOne", null);
__decorate([
    (0, common_1.Post)('pre-order'),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_order_dto_1.CreateOrderDto]),
    __metadata("design:returntype", Promise)
], OrdersController.prototype, "createPreOrder", null);
__decorate([
    (0, common_1.Patch)(':id/convert-pre-order'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], OrdersController.prototype, "convertPreOrder", null);
__decorate([
    (0, common_1.Patch)(':id/status'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_order_status_dto_1.UpdateOrderStatusDto]),
    __metadata("design:returntype", Promise)
], OrdersController.prototype, "updateStatus", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_order_dto_1.UpdateOrderDto]),
    __metadata("design:returntype", Promise)
], OrdersController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], OrdersController.prototype, "remove", null);
exports.OrdersController = OrdersController = __decorate([
    (0, common_1.Controller)('orders'),
    __metadata("design:paramtypes", [orders_service_1.OrdersService])
], OrdersController);
//# sourceMappingURL=orders.controller.js.map