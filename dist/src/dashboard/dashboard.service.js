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
exports.DashboardService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const order_entity_1 = require("../orders/entities/order.entity");
const custom_order_entity_1 = require("../custom-orders/entities/custom-order.entity");
const user_entity_1 = require("../users/entities/user.entity");
let DashboardService = class DashboardService {
    constructor(orderRepository, customOrderRepository, userRepository) {
        this.orderRepository = orderRepository;
        this.customOrderRepository = customOrderRepository;
        this.userRepository = userRepository;
    }
    async getDashboardData() {
        const [orders, customOrders, userCount] = await Promise.all([
            this.orderRepository.find({ relations: { user: true } }),
            this.customOrderRepository.find({ relations: { user: true } }),
            this.userRepository.count(),
        ]);
        const paidOrders = orders.filter((order) => order.status !== order_entity_1.OrderStatus.REFUNDED);
        const paidCustomOrders = customOrders.filter((order) => order.status !== 'New Request');
        const orderRevenue = paidOrders.reduce((total, order) => total + Number(order.totalAmount || 0), 0);
        const customRevenue = paidCustomOrders.reduce((total, order) => total + Number(order.price || 0) * Number(order.quantity || 1), 0);
        const totalOrders = orders.length + customOrders.length;
        const activeOrders = orders.filter((order) => ![order_entity_1.OrderStatus.DELIVERED, order_entity_1.OrderStatus.REFUNDED].includes(order.status)).length;
        const activeCustomOrders = customOrders.filter((order) => order.status !== 'Delivered').length;
        const revenue = orderRevenue + customRevenue;
        const currentYear = new Date().getFullYear();
        const monthlyRevenue = Array.from({ length: 12 }, (_, month) => {
            const regularTotal = paidOrders
                .filter((order) => order.createdAt.getFullYear() === currentYear && order.createdAt.getMonth() === month)
                .reduce((total, order) => total + Number(order.totalAmount || 0), 0);
            const customTotal = paidCustomOrders
                .filter((order) => order.createdAt.getFullYear() === currentYear && order.createdAt.getMonth() === month)
                .reduce((total, order) => total + Number(order.price || 0) * Number(order.quantity || 1), 0);
            return { name: new Date(currentYear, month, 1).toLocaleString('en-US', { month: 'short' }), total: Math.round(regularTotal + customTotal) };
        });
        const recentSales = [
            ...orders.map((order) => ({
                id: `order-${order.id}`,
                name: order.user?.name || order.orderNotes || 'Guest',
                email: order.user?.email || 'Guest order',
                amount: `৳${Number(order.totalAmount || 0).toLocaleString()}`,
                createdAt: order.createdAt,
            })),
            ...customOrders.map((order) => ({
                id: `custom-${order.id}`,
                name: order.customerName || 'Custom customer',
                email: order.customerEmail || 'No email provided',
                amount: `৳${(Number(order.price || 0) * Number(order.quantity || 1)).toLocaleString()}`,
                createdAt: order.createdAt,
            })),
        ]
            .sort((first, second) => second.createdAt.getTime() - first.createdAt.getTime())
            .slice(0, 5)
            .map(({ id, name, email, amount }) => ({ id, name, email, amount }));
        return {
            totalRevenue: {
                value: `৳${revenue.toLocaleString()}`,
                percentageChange: `${paidOrders.length + paidCustomOrders.length} paid orders`,
            },
            subscriptions: {
                value: userCount.toLocaleString(),
                percentageChange: 'registered customers',
            },
            sales: {
                value: totalOrders.toLocaleString(),
                percentageChange: 'regular and custom orders',
            },
            activeNow: {
                value: (activeOrders + activeCustomOrders).toLocaleString(),
                percentageChange: 'active orders',
            },
            chartData: monthlyRevenue,
            recentSales,
        };
    }
};
exports.DashboardService = DashboardService;
exports.DashboardService = DashboardService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(order_entity_1.Order)),
    __param(1, (0, typeorm_1.InjectRepository)(custom_order_entity_1.CustomOrder)),
    __param(2, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], DashboardService);
//# sourceMappingURL=dashboard.service.js.map