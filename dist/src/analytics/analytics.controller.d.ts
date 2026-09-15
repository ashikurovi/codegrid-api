import { AnalyticsService } from './analytics.service';
export declare class AnalyticsController {
    private readonly analyticsService;
    constructor(analyticsService: AnalyticsService);
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
