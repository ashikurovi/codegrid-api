import { Repository } from 'typeorm';
import { Order } from '../orders/entities/order.entity';
import { CustomOrder } from '../custom-orders/entities/custom-order.entity';
import { User } from '../users/entities/user.entity';
import { Costing } from '../costing/entities/costing.entity';
export declare class DashboardService {
    private readonly orderRepository;
    private readonly customOrderRepository;
    private readonly userRepository;
    private readonly costingRepository;
    constructor(orderRepository: Repository<Order>, customOrderRepository: Repository<CustomOrder>, userRepository: Repository<User>, costingRepository: Repository<Costing>);
    private getDateKey;
    private getOrderCost;
    private getCustomOrderCost;
    private getDateRangeForDays;
    private getWeekRange;
    private createMetricSummary;
    getDashboardData(): Promise<{
        totalRevenue: {
            value: string;
            percentageChange: string;
        };
        subscriptions: {
            value: string;
            percentageChange: string;
        };
        sales: {
            value: string;
            percentageChange: string;
        };
        activeNow: {
            value: string;
            percentageChange: string;
        };
        totalSell: number;
        totalCost: number;
        income: number;
        statusSummary: {
            pending: number;
            shipped: number;
            delivered: number;
            refunded: number;
        };
        dailySummary: {
            date: string;
            totalSell: number;
            totalCost: number;
            income: number;
            pending: number;
            shipped: number;
            delivered: number;
            refunded: number;
        }[];
        weeklySummary: any[];
        chartData: {
            name: string;
            total: number;
        }[];
        recentSales: {
            id: string;
            name: string;
            email: string;
            amount: string;
        }[];
    }>;
}
