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
exports.IncompleteOrdersService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const incomplete_order_entity_1 = require("./entities/incomplete-order.entity");
const mail_service_1 = require("../mail/mail.service");
let IncompleteOrdersService = class IncompleteOrdersService {
    constructor(incompleteOrderRepository, mailService) {
        this.incompleteOrderRepository = incompleteOrderRepository;
        this.mailService = mailService;
    }
    async create(createIncompleteOrderDto) {
        const incompleteOrder = this.incompleteOrderRepository.create(createIncompleteOrderDto);
        const savedOrder = await this.incompleteOrderRepository.save(incompleteOrder);
        if (savedOrder.customerEmail) {
            this.mailService.sendAbandonedCartEmail(savedOrder.customerEmail, savedOrder.customerName);
        }
        return savedOrder;
    }
    async findAll() {
        return await this.incompleteOrderRepository.find({
            order: { createdAt: 'DESC' },
        });
    }
    async findOne(id) {
        const incompleteOrder = await this.incompleteOrderRepository.findOne({ where: { id } });
        if (!incompleteOrder) {
            throw new common_1.NotFoundException(`Incomplete Order with ID ${id} not found`);
        }
        return incompleteOrder;
    }
    async update(id, updateIncompleteOrderDto) {
        const incompleteOrder = await this.findOne(id);
        Object.assign(incompleteOrder, updateIncompleteOrderDto);
        return await this.incompleteOrderRepository.save(incompleteOrder);
    }
    async remove(id) {
        const incompleteOrder = await this.findOne(id);
        await this.incompleteOrderRepository.remove(incompleteOrder);
    }
    async triggerAbandonedCartEmail(id) {
        const incompleteOrder = await this.findOne(id);
        if (!incompleteOrder.customerEmail) {
            throw new common_1.NotFoundException(`No email found for Incomplete Order with ID ${id}`);
        }
        await this.mailService.sendAbandonedCartEmail(incompleteOrder.customerEmail, incompleteOrder.customerName);
        return { message: 'Abandoned cart email sent successfully' };
    }
};
exports.IncompleteOrdersService = IncompleteOrdersService;
exports.IncompleteOrdersService = IncompleteOrdersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(incomplete_order_entity_1.IncompleteOrder)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        mail_service_1.MailService])
], IncompleteOrdersService);
//# sourceMappingURL=incomplete-orders.service.js.map