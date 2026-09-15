import { Repository } from 'typeorm';
import { Order } from '../orders/entities/order.entity';
import { CustomOrder } from '../custom-orders/entities/custom-order.entity';
import { User } from '../users/entities/user.entity';
export declare class DashboardService {
    private readonly orderRepository;
    private readonly customOrderRepository;
    private readonly userRepository;
    constructor(orderRepository: Repository<Order>, customOrderRepository: Repository<CustomOrder>, userRepository: Repository<User>);
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
