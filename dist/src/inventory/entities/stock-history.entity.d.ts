import { Inventory } from './inventory.entity';
export declare class StockHistory {
    id: number;
    inventory: Inventory;
    changeAmount: number;
    reason: string;
    createdAt: Date;
}
