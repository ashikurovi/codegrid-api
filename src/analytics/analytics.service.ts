import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order, OrderStatus } from '../orders/entities/order.entity';
import { CustomOrder, CustomOrderStatus } from '../custom-orders/entities/custom-order.entity';
import { User } from '../users/entities/user.entity';

@Injectable()
export class AnalyticsService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
    @InjectRepository(CustomOrder)
    private readonly customOrderRepository: Repository<CustomOrder>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async getAnalyticsData() {
    const [orders, customOrders, userCount] = await Promise.all([
      this.orderRepository.find({ relations: { items: { product: { category: true } } } }),
      this.customOrderRepository.find(),
      this.userRepository.count(),
    ]);

    const validOrders = orders.filter((order) => order.status !== OrderStatus.REFUNDED);
    const validCustomOrders = customOrders.filter((order) => order.status !== CustomOrderStatus.NEW_REQUEST);
    const grossRevenue = validOrders.reduce((total, order) => total + Number(order.totalAmount || 0), 0)
      + validCustomOrders.reduce((total, order) => total + Number(order.price || 0) * Number(order.quantity || 1), 0);
    const totalOrders = orders.length + customOrders.length;
    const completedOrders = orders.filter((order) => order.status === OrderStatus.DELIVERED).length
      + customOrders.filter((order) => order.status === CustomOrderStatus.DELIVERED).length;
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

    const categoryRevenue = new Map<string, number>();
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
}
