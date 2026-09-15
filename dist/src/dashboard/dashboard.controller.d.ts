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
