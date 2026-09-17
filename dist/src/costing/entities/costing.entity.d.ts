import { Order } from '../../orders/entities/order.entity';
import { Product } from '../../products/entities/product.entity';
export declare class Costing {
    id: number;
    order?: Order;
    orderId?: number;
    product?: Product;
    productId?: number;
    unitCost: number;
    quantity: number;
    totalCost: number;
    notes?: string;
    createdAt: Date;
    updatedAt: Date;
}
