import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order, OrderStatus } from '../orders/entities/order.entity';
import { CustomOrder } from '../custom-orders/entities/custom-order.entity';
import { User } from '../users/entities/user.entity';

@Injectable()
export class DashboardService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
    @InjectRepository(CustomOrder)
    private readonly customOrderRepository: Repository<CustomOrder>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async getDashboardData() {
    const [orders, customOrders, userCount] = await Promise.all([
      this.orderRepository.find({ relations: { user: true } }),
      this.customOrderRepository.find({ relations: { user: true } }),
      this.userRepository.count(),
    ]);

    const paidOrders = orders.filter((order) => order.status !== OrderStatus.REFUNDED);
    const paidCustomOrders = customOrders.filter((order) => order.status !== 'New Request');
    const orderRevenue = paidOrders.reduce((total, order) => total + Number(order.totalAmount || 0), 0);
    const customRevenue = paidCustomOrders.reduce((total, order) => total + Number(order.price || 0) * Number(order.quantity || 1), 0);
    const totalOrders = orders.length + customOrders.length;
    const activeOrders = orders.filter((order) => ![OrderStatus.DELIVERED, OrderStatus.REFUNDED].includes(order.status)).length;
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
}
