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
exports.AnalyticsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const order_entity_1 = require("../orders/entities/order.entity");
const custom_order_entity_1 = require("../custom-orders/entities/custom-order.entity");
const user_entity_1 = require("../users/entities/user.entity");
let AnalyticsService = class AnalyticsService {
    constructor(orderRepository, customOrderRepository, userRepository) {
        this.orderRepository = orderRepository;
        this.customOrderRepository = customOrderRepository;
        this.userRepository = userRepository;
    }
    async getAnalyticsData() {
        const [orders, customOrders, userCount] = await Promise.all([
            this.orderRepository.find({ relations: { items: { product: { category: true } } } }),
            this.customOrderRepository.find(),
            this.userRepository.count(),
        ]);
        const validOrders = orders.filter((order) => order.status !== order_entity_1.OrderStatus.REFUNDED);
        const validCustomOrders = customOrders.filter((order) => order.status !== 'New Request');
        const grossRevenue = validOrders.reduce((total, order) => total + Number(order.totalAmount || 0), 0)
            + validCustomOrders.reduce((total, order) => total + Number(order.price || 0) * Number(order.quantity || 1), 0);
        const totalOrders = orders.length + customOrders.length;
        const completedOrders = orders.filter((order) => order.status === order_entity_1.OrderStatus.DELIVERED).length
            + customOrders.filter((order) => order.status === 'Delivered').length;
        const currentYear = new Date().getFullYear();
        const revenueOverTime = Array.from({ length: 12 }, (_, month) => {
            const regularRevenue = validOrders
                .filter((order) => order.createdAt.getFullYear() === currentYear && order.createdAt.getMonth() === month)
                .reduce((total, order) => total + Number(order.totalAmount || 0), 0);
            const customRevenue = validCustomOrders
                .filter((order) => order.createdAt.getFullYear() === currentYear && order.createdAt.getMonth() === month)
                .reduce((total, order) => total + Number(order.price || 0) * Number(order.quantity || 1), 0);
            return Math.round(regularRevenue + customRevenue);
        });
        const categoryRevenue = new Map();
        validOrders.forEach((order) => {
            const itemCount = order.items?.length || 1;
            const amountPerItem = Number(order.totalAmount || 0) / itemCount;
            order.items?.forEach((item) => {
                const category = item.product?.category?.name || 'Standard Retail';
                categoryRevenue.set(category, (categoryRevenue.get(category) || 0) + amountPerItem);
            });
        });
        validCustomOrders.forEach((order) => {
            const category = order.category || 'Custom Orders';
            const amount = Number(order.price || 0) * Number(order.quantity || 1);
            categoryRevenue.set(category, (categoryRevenue.get(category) || 0) + amount);
        });
        const categoryTotal = Array.from(categoryRevenue.values()).reduce((total, value) => total + value, 0);
        const categories = Array.from(categoryRevenue.entries())
            .sort(([, first], [, second]) => second - first)
            .slice(0, 4)
            .map(([name, value]) => ({ name, percentage: categoryTotal ? Math.round((value / categoryTotal) * 100) : 0 }));
        return {
            topStats: {
                grossRevenue: {
                    value: `৳${grossRevenue.toLocaleString()}`,
                    trend: `${validOrders.length + validCustomOrders.length} paid orders`,
                    isPositive: true,
                },
                totalOrders: {
                    value: totalOrders.toLocaleString(),
                    trend: 'regular and custom orders',
                    isPositive: true,
                },
                conversionRate: {
                    value: `${totalOrders ? ((completedOrders / totalOrders) * 100).toFixed(2) : '0.00'}%`,
                    trend: 'completed order rate',
                    isPositive: completedOrders > 0,
                },
                newCustomers: {
                    value: userCount.toLocaleString(),
                    trend: 'registered customers',
                    isPositive: true,
                },
            },
            revenueOverTime,
            salesByCategory: {
                subtitle: categoryTotal ? 'Revenue share by category from completed sales.' : 'No sales data available yet.',
                categories,
            },
        };
    }
};
exports.AnalyticsService = AnalyticsService;
exports.AnalyticsService = AnalyticsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(order_entity_1.Order)),
    __param(1, (0, typeorm_1.InjectRepository)(custom_order_entity_1.CustomOrder)),
    __param(2, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], AnalyticsService);
//# sourceMappingURL=analytics.service.js.map