import { CustomOrderStatus } from '../entities/custom-order.entity';
export declare class CreateCustomOrderDto {
    userId?: number;
    customProductId?: number;
    customerName?: string;
    customerPhone?: string;
    customerEmail?: string;
    category: string;
    item: string;
    quantity: number;
    details?: string;
    designReference?: string;
    status?: CustomOrderStatus;
    price?: number;
}
