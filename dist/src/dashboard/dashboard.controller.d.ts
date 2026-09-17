import { DashboardService } from './dashboard.service';
export declare class DashboardController {
    private readonly dashboardService;
    constructor(dashboardService: DashboardService);
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
