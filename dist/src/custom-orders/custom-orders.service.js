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
exports.CustomOrdersService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const custom_order_entity_1 = require("./entities/custom-order.entity");
const mail_service_1 = require("../mail/mail.service");
const users_service_1 = require("../users/users.service");
let CustomOrdersService = class CustomOrdersService {
    constructor(customOrderRepository, mailService, usersService) {
        this.customOrderRepository = customOrderRepository;
        this.mailService = mailService;
        this.usersService = usersService;
    }
    async create(createCustomOrderDto) {
        const { userId, customerName, customerPhone, customerEmail, ...rest } = createCustomOrderDto;
        let resolvedUserId = userId;
        if (!resolvedUserId && (customerName || customerPhone || customerEmail)) {
            const emailToUse = customerEmail || `${customerPhone || 'guest'}_${Date.now()}@codegrid.local`;
            let user = await this.usersService.findByEmail(emailToUse);
            if (!user) {
                user = await this.usersService.create({
                    name: customerName || 'Guest User',
                    email: emailToUse,
                    password: `Guest${Date.now()}!`,
                    phone: customerPhone,
                });
            }
            resolvedUserId = user.id;
        }
        const customOrder = this.customOrderRepository.create({
            ...rest,
            customerName,
            customerPhone,
            customerEmail,
            user: resolvedUserId ? { id: resolvedUserId } : undefined,
            customProduct: rest.customProductId ? { id: rest.customProductId } : undefined,
        });
        return await this.customOrderRepository.save(customOrder);
    }
    async findAll() {
        return await this.customOrderRepository.find({
            relations: { user: true, customProduct: true },
            order: { createdAt: 'DESC' },
        });
    }
    async findOne(id) {
        const customOrder = await this.customOrderRepository.findOne({
            where: { id },
            relations: { user: true, customProduct: true },
        });
        if (!customOrder) {
            throw new common_1.NotFoundException(`Custom Order with ID ${id} not found`);
        }
        return customOrder;
    }
    async update(id, updateCustomOrderDto) {
        const customOrder = await this.findOne(id);
        const { userId, ...rest } = updateCustomOrderDto;
        if (userId !== undefined) {
            customOrder.user = { id: userId };
        }
        Object.assign(customOrder, rest);
        return await this.customOrderRepository.save(customOrder);
    }
    async updateStatus(id, status) {
        const customOrder = await this.findOne(id);
        const oldStatus = customOrder.status;
        customOrder.status = status;
        const updatedCustomOrder = await this.customOrderRepository.save(customOrder);
        if (oldStatus !== status) {
            if (updatedCustomOrder.user && updatedCustomOrder.user.email) {
                this.mailService.sendCustomOrderStatusUpdateEmail(updatedCustomOrder.user.email, updatedCustomOrder.id, updatedCustomOrder.status);
            }
        }
        return updatedCustomOrder;
    }
    async remove(id) {
        const customOrder = await this.findOne(id);
        await this.customOrderRepository.remove(customOrder);
    }
};
exports.CustomOrdersService = CustomOrdersService;
exports.CustomOrdersService = CustomOrdersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(custom_order_entity_1.CustomOrder)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        mail_service_1.MailService,
        users_service_1.UsersService])
], CustomOrdersService);
//# sourceMappingURL=custom-orders.service.js.map