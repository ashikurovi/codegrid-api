import { StockHistory } from './stock-history.entity';
export declare enum InventoryStatus {
    IN_STOCK = "In Stock",
    LOW_STOCK = "Low Stock",
    OUT_OF_STOCK = "Out of Stock"
}
export declare class Inventory {
    id: number;
    product: string;
    sku: string;
    stock: number;
    status: InventoryStatus;
    createdAt: Date;
    updatedAt: Date;
    history: StockHistory[];
}
