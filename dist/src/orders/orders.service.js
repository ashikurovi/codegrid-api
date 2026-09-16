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
exports.OrdersService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const order_entity_1 = require("./entities/order.entity");
const mail_service_1 = require("../mail/mail.service");
const inventory_service_1 = require("../inventory/inventory.service");
const product_entity_1 = require("../products/entities/product.entity");
const users_service_1 = require("../users/users.service");
let OrdersService = class OrdersService {
    constructor(orderRepository, inventoryService, productRepository, mailService, usersService) {
        this.orderRepository = orderRepository;
        this.inventoryService = inventoryService;
        this.productRepository = productRepository;
        this.mailService = mailService;
        this.usersService = usersService;
    }
    async create(createOrderDto) {
        const { items, userId, customerName, customerEmail, customerPhone, ...rest } = createOrderDto;
        const orderItems = items?.map((item) => ({
            product: { id: item.productId },
            quantity: item.quantity,
        }));
        let finalUserId = userId;
        if (!finalUserId && customerEmail && customerName) {
            let user = await this.usersService.findByEmail(customerEmail);
            if (!user) {
                user = await this.usersService.create({
                    name: customerName,
                    email: customerEmail,
                    password: Math.random().toString(36).slice(-8),
                    phone: customerPhone,
                });
            }
            finalUserId = user.id;
        }
        const order = this.orderRepository.create({
            ...rest,
            user: finalUserId ? { id: finalUserId } : undefined,
            items: orderItems,
        });
        const savedOrder = await this.orderRepository.save(order);
        await this.mailService.sendNewOrderNotification({
            orderId: savedOrder.id,
            customerName,
            customerEmail,
            customerPhone,
            shippingAddress: createOrderDto.shippingAddress,
            paymentMethod: createOrderDto.paymentMethod,
            deliveryType: createOrderDto.deliveryType,
            totalAmount: createOrderDto.totalAmount,
            deviceId: createOrderDto.deviceId,
            device: createOrderDto.device,
            location: createOrderDto.location,
            items,
        });
        return savedOrder;
    }
    async findAll() {
        return await this.orderRepository.find({
            relations: {
                user: true,
                items: {
                    product: true,
                },
            },
            select: {
                id: true,
                status: true,
                totalAmount: true,
                shippingAddress: true,
                paymentMethod: true,
                deviceId: true,
                device: true,
                location: true,
                createdAt: true,
                updatedAt: true,
                user: { id: true, name: true, email: true },
                items: { id: true, quantity: true, product: { id: true, title: true, currentPrice: true, thumbnail: true } }
            },
            order: { createdAt: 'DESC' },
        });
    }
    async findAllByUser(userId) {
        return await this.orderRepository.find({
            where: { user: { id: userId } },
            relations: {
                items: {
                    product: true,
                },
            },
            select: {
                id: true,
                status: true,
                totalAmount: true,
                shippingAddress: true,
                paymentMethod: true,
                deviceId: true,
                device: true,
                location: true,
                createdAt: true,
                updatedAt: true,
                items: { id: true, quantity: true, product: { id: true, title: true, currentPrice: true, thumbnail: true } }
            },
            order: { createdAt: 'DESC' },
        });
    }
    async trackOrder(identifier) {
        let idToSearch = null;
        const cgMatch = identifier.match(/^CG-(\d+)$/i);
        if (cgMatch) {
            idToSearch = parseInt(cgMatch[1], 10);
        }
        else if (/^\d+$/.test(identifier)) {
            idToSearch = parseInt(identifier, 10);
        }
        let order = null;
        if (idToSearch !== null) {
            order = await this.orderRepository.findOne({
                where: { id: idToSearch },
                relations: {
                    items: {
                        product: true
                    },
                    user: true
                },
                select: {
                    id: true,
                    status: true,
                    totalAmount: true,
                    shippingAddress: true,
                    paymentMethod: true,
                    deviceId: true,
                    device: true,
                    location: true,
                    createdAt: true,
                    updatedAt: true,
                    user: { id: true, name: true, email: true },
                    items: { id: true, quantity: true, product: { id: true, title: true, currentPrice: true, thumbnail: true } }
                }
            });
        }
        if (!order) {
            throw new common_1.NotFoundException(`Order not found for tracking identifier #${identifier}`);
        }
        return order;
    }
    async findOne(id) {
        const order = await this.orderRepository.findOne({
            where: { id },
            relations: {
                user: true,
                items: {
                    product: true,
                },
            },
            select: {
                id: true,
                status: true,
                totalAmount: true,
                shippingAddress: true,
                paymentMethod: true,
                deviceId: true,
                device: true,
                location: true,
                createdAt: true,
                updatedAt: true,
                user: { id: true, name: true, email: true },
                items: { id: true, quantity: true, product: { id: true, title: true, currentPrice: true, thumbnail: true } }
            }
        });
        if (!order) {
            throw new common_1.NotFoundException(`Order with ID ${id} not found`);
        }
        return order;
    }
    async update(id, updateOrderDto) {
        const order = await this.findOne(id);
        const { items, userId, ...rest } = updateOrderDto;
        if (items) {
            order.items = items.map((item) => ({
                product: { id: item.productId },
                quantity: item.quantity,
            }));
        }
        if (userId !== undefined) {
            order.user = { id: userId };
        }
        Object.assign(order, rest);
        return await this.orderRepository.save(order);
    }
    async updateStatus(id, status) {
        const order = await this.findOne(id);
        const oldStatus = order.status;
        order.status = status;
        const updatedOrder = await this.orderRepository.save(order);
        if (oldStatus !== status) {
            const isConfirmed = status === order_entity_1.OrderStatus.PROCESSING || status === order_entity_1.OrderStatus.SHIPPED;
            const wasConfirmed = oldStatus === order_entity_1.OrderStatus.PROCESSING || oldStatus === order_entity_1.OrderStatus.SHIPPED;
            if (isConfirmed && !wasConfirmed) {
                for (const item of updatedOrder.items) {
                    if (item.product?.id && item.product?.title) {
                        await this.inventoryService.adjustStockByProduct(item.product.title, -item.quantity, `Order #${updatedOrder.id} confirmed`);
                        const productEntity = await this.productRepository.findOne({ where: { id: item.product.id } });
                        if (productEntity) {
                            productEntity.stock = Math.max(0, (productEntity.stock || 0) - item.quantity);
                            await this.productRepository.save(productEntity);
                        }
                    }
                }
            }
            else if (status === order_entity_1.OrderStatus.REFUNDED) {
                for (const item of updatedOrder.items) {
                    if (item.product?.id && item.product?.title) {
                        await this.inventoryService.adjustStockByProduct(item.product.title, item.quantity, `Order #${updatedOrder.id} refunded`);
                        const productEntity = await this.productRepository.findOne({ where: { id: item.product.id } });
                        if (productEntity) {
                            productEntity.stock = (productEntity.stock || 0) + item.quantity;
                            await this.productRepository.save(productEntity);
                        }
                    }
                }
            }
            if (updatedOrder.user?.email) {
                await this.mailService.sendOrderStatusUpdateEmail(updatedOrder.user.email, updatedOrder.id, updatedOrder.status);
            }
        }
        return updatedOrder;
    }
    async remove(id) {
        const order = await this.findOne(id);
        await this.orderRepository.remove(order);
    }
};
exports.OrdersService = OrdersService;
exports.OrdersService = OrdersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(order_entity_1.Order)),
    __param(2, (0, typeorm_1.InjectRepository)(product_entity_1.Product)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        inventory_service_1.InventoryService,
        typeorm_2.Repository,
        mail_service_1.MailService,
        users_service_1.UsersService])
], OrdersService);
//# sourceMappingURL=orders.service.js.map