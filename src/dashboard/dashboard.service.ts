import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order, OrderStatus } from '../orders/entities/order.entity';
import { CustomOrder, CustomOrderStatus } from '../custom-orders/entities/custom-order.entity';
import { User } from '../users/entities/user.entity';
import { Costing } from '../costing/entities/costing.entity';

@Injectable()
export class DashboardService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
    @InjectRepository(CustomOrder)
    private readonly customOrderRepository: Repository<CustomOrder>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Costing)
    private readonly costingRepository: Repository<Costing>,
  ) {}

  private getDateKey(date: Date) {
    return new Date(date).toISOString().slice(0, 10);
  }

  private getOrderCost(order: Order) {
    const orderItemsCost = order.items?.reduce((total, item) => {
      const productCost = Number(item.product?.originalPrice || 0);
      return total + productCost * Number(item.quantity || 1);
    }, 0) || 0;

    return Number(orderItemsCost || 0);
  }

  private getCustomOrderCost(order: CustomOrder) {
    if (!order.price) return 0;
    return Number(order.price) * Number(order.quantity || 1) * 0.65;
  }

  private getDateRangeForDays(days: number) {
    const list: string[] = [];
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    for (let index = days - 1; index >= 0; index -= 1) {
      const date = new Date(today);
      date.setDate(date.getDate() - index);
      list.push(this.getDateKey(date));
    }

    return list;
  }

  private getWeekRange(startDate: Date) {
    const start = new Date(startDate);
    start.setHours(0, 0, 0, 0);
    const day = start.getDay();
    const diff = (day === 0 ? -6 : 1 - day);
    start.setDate(start.getDate() + diff);

    const end = new Date(start);
    end.setDate(end.getDate() + 6);

    return {
      start: this.getDateKey(start),
      end: this.getDateKey(end),
    };
  }

  private createMetricSummary(dateKey: string, regularOrders: Order[], customOrders: CustomOrder[], costingRecords: Costing[] = []) {
    const summary = {
      date: dateKey,
      totalSell: 0,
      totalCost: 0,
      income: 0,
      pending: 0,
      shipped: 0,
      delivered: 0,
      refunded: 0,
    };

    regularOrders.forEach((order) => {
      const isDelivered = order.status === OrderStatus.DELIVERED;
      const sell = isDelivered ? Number(order.totalAmount || 0) : 0;

      summary.totalSell += sell;

      if (order.status === OrderStatus.PENDING) summary.pending += 1;
      if (order.status === OrderStatus.SHIPPED) summary.shipped += 1;
      if (order.status === OrderStatus.DELIVERED) summary.delivered += 1;
      if (order.status === OrderStatus.REFUNDED) summary.refunded += 1;
    });

    customOrders.forEach((order) => {
      const isDelivered = order.status === CustomOrderStatus.DELIVERED;
      const sell = isDelivered ? Number(order.price || 0) * Number(order.quantity || 1) : 0;

      summary.totalSell += sell;

      if ([CustomOrderStatus.NEW_REQUEST, CustomOrderStatus.QUOTED, CustomOrderStatus.IN_PRODUCTION].includes(order.status)) {
        summary.pending += 1;
      }
      if (order.status === CustomOrderStatus.DELIVERED) summary.delivered += 1;
    });

    summary.totalCost = costingRecords.reduce((total, record) => total + Number(record.cost || 0), 0);
    summary.income = summary.totalSell - summary.totalCost;

    return summary;
  }

  async getDashboardData() {
    const [orders, customOrders, userCount, costingRecords] = await Promise.all([
      this.orderRepository.find({ relations: { user: true, items: { product: true } } }),
      this.customOrderRepository.find({ relations: { user: true } }),
      this.userRepository.count(),
      this.costingRepository.find(),
    ]);

    const deliveredOrders = orders.filter((order) => order.status === OrderStatus.DELIVERED);
    const deliveredCustomOrders = customOrders.filter((order) => order.status === CustomOrderStatus.DELIVERED);
    const orderRevenue = deliveredOrders.reduce((total, order) => total + Number(order.totalAmount || 0), 0);
    const customRevenue = deliveredCustomOrders.reduce((total, order) => total + Number(order.price || 0) * Number(order.quantity || 1), 0);
    const totalOrders = orders.length + customOrders.length;
    const activeOrders = orders.filter((order) => ![OrderStatus.DELIVERED, OrderStatus.REFUNDED].includes(order.status)).length;
    const activeCustomOrders = customOrders.filter((order) => order.status !== CustomOrderStatus.DELIVERED).length;
    const revenue = orderRevenue + customRevenue;

    const totalSell = revenue;
    const totalCost = costingRecords.reduce((total, record) => total + Number(record.cost || 0), 0);
    const income = totalSell - totalCost;

    const currentYear = new Date().getFullYear();
    const monthlyRevenue = Array.from({ length: 12 }, (_, month) => {
      const regularTotal = deliveredOrders
        .filter((order) => order.createdAt.getFullYear() === currentYear && order.createdAt.getMonth() === month)
        .reduce((total, order) => total + Number(order.totalAmount || 0), 0);
      const customTotal = deliveredCustomOrders
        .filter((order) => order.createdAt.getFullYear() === currentYear && order.createdAt.getMonth() === month)
        .reduce((total, order) => total + Number(order.price || 0) * Number(order.quantity || 1), 0);

      return { name: new Date(currentYear, month, 1).toLocaleString('en-US', { month: 'short' }), total: Math.round(regularTotal + customTotal) };
    });

    const dailyDates = this.getDateRangeForDays(7);
    const dailySummary = dailyDates.map((dateKey) => {
      const regularOrdersForDay = orders.filter((order) => this.getDateKey(order.createdAt) === dateKey);
      const customOrdersForDay = customOrders.filter((order) => this.getDateKey(order.createdAt) === dateKey);
      const costingForDay = costingRecords.filter((record) => this.getDateKey(record.createdAt) === dateKey);
      return this.createMetricSummary(dateKey, regularOrdersForDay, customOrdersForDay, costingForDay);
    });

    const weeklySummary = [];
    const weekStart = new Date();
    weekStart.setHours(0, 0, 0, 0);

    for (let index = 7; index >= 0; index -= 1) {
      const currentWeekStart = new Date(weekStart);
      currentWeekStart.setDate(currentWeekStart.getDate() - (index * 7));
      const range = this.getWeekRange(currentWeekStart);

      const regularOrdersForWeek = orders.filter((order) => {
        const dateKey = this.getDateKey(order.createdAt);
        return dateKey >= range.start && dateKey <= range.end;
      });

      const customOrdersForWeek = customOrders.filter((order) => {
        const dateKey = this.getDateKey(order.createdAt);
        return dateKey >= range.start && dateKey <= range.end;
      });

      const costingForWeek = costingRecords.filter((record) => {
        const dateKey = this.getDateKey(record.createdAt);
        return dateKey >= range.start && dateKey <= range.end;
      });

      weeklySummary.push({
        weekStart: range.start,
        weekEnd: range.end,
        ...this.createMetricSummary(`${range.start} to ${range.end}`, regularOrdersForWeek, customOrdersForWeek, costingForWeek),
      });
    }

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

    const statusSummary = {
      pending: orders.filter((order) => order.status === OrderStatus.PENDING).length
        + customOrders.filter((order) => [CustomOrderStatus.NEW_REQUEST, CustomOrderStatus.QUOTED, CustomOrderStatus.IN_PRODUCTION].includes(order.status)).length,
      shipped: orders.filter((order) => order.status === OrderStatus.SHIPPED).length,
      delivered: orders.filter((order) => order.status === OrderStatus.DELIVERED).length + customOrders.filter((order) => order.status === CustomOrderStatus.DELIVERED).length,
      refunded: orders.filter((order) => order.status === OrderStatus.REFUNDED).length,
    };

    return {
      totalRevenue: {
        value: `৳${revenue.toLocaleString()}`,
        percentageChange: `${deliveredOrders.length + deliveredCustomOrders.length} delivered orders`,
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
      totalSell,
      totalCost,
      income,
      statusSummary,
      dailySummary,
      weeklySummary,
      chartData: monthlyRevenue,
      recentSales,
    };
  }
}
