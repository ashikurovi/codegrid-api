import { User } from '../../users/entities/user.entity';
import { CustomProduct } from '../../custom-products/entities/custom-product.entity';
export declare enum CustomOrderStatus {
    NEW_REQUEST = "New Request",
    QUOTED = "Quoted",
    IN_PRODUCTION = "In Production",
    DELIVERED = "Delivered"
}
export declare class CustomOrder {
    id: number;
    customProduct: CustomProduct;
    user: User;
    customerName: string;
    customerPhone: string;
    customerEmail: string;
    category: string;
    item: string;
    quantity: number;
    details: string;
    designReference: string;
    status: CustomOrderStatus;
    price: number;
    createdAt: Date;
    updatedAt: Date;
}
