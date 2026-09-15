import { InventoryStatus } from '../entities/inventory.entity';
export declare class CreateInventoryDto {
    product: string;
    sku: string;
    stock: number;
    status?: InventoryStatus;
}
