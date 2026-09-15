import { IncompleteOrderStatus } from '../entities/incomplete-order.entity';
declare class IncompleteOrderProductDto {
    productId?: number;
    quantity?: number;
    productName?: string;
}
export declare class CreateIncompleteOrderDto {
    customerName?: string;
    customerEmail?: string;
    customerPhone?: string;
    selectedProducts?: IncompleteOrderProductDto[];
    status?: IncompleteOrderStatus;
}
export {};
