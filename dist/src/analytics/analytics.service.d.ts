import { Repository } from 'typeorm';
import { Order } from '../orders/entities/order.entity';
import { CustomOrder } from '../custom-orders/entities/custom-order.entity';
import { User } from '../users/entities/user.entity';
export declare class AnalyticsService {
    private readonly orderRepository;
    private readonly customOrderRepository;
    private readonly userRepository;
    constructor(orderRepository: Repository<Order>, customOrderRepository: Repository<CustomOrder>, userRepository: Repository<User>);
    getAnalyticsData(): Promise<{
        topStats: {
            grossRevenue: {
                value: string;
                trend: string;
                isPositive: boolean;
            };
            totalOrders: {
                value: string;
                trend: string;
                isPositive: boolean;
            };
            conversionRate: {
                value: string;
                trend: string;
                isPositive: boolean;
            };
            newCustomers: {
                value: string;
                trend: string;
                isPositive: boolean;
            };
        };
        revenueOverTime: number[];
        salesByCategory: {
            subtitle: string;
            categories: {
                name: string;
                percentage: number;
            }[];
        };
    }>;
}
