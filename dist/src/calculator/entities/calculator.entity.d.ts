export declare class Calculator {
    id: number;
    name: string;
    quantity: number;
    buyingPrice: number;
    designCost: number;
    additionalCost: number;
    sellingPrice: number;
    createdAt: Date;
    updatedAt: Date;
    unitCost: number;
    rowTotalCost: number;
    rowTotalRevenue: number;
    rowTotalProfit: number;
    margin: string;
    calculateTotals(): void;
}
