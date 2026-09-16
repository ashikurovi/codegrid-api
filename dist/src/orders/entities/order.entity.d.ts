import { OrderItem } from './order-item.entity';
import { User } from '../../users/entities/user.entity';
export declare enum OrderStatus {
    PENDING = "Pending",
    PROCESSING = "Processing",
    SHIPPED = "Shipped",
    DELIVERED = "Delivered",
    REFUNDED = "Refunded"
}
export declare enum PaymentMethod {
    COD = "COD",
    BKASH = "Bkash"
}
export declare enum DeliveryType {
    INSIDE_DHAKA = "INSIDE_DHAKA",
    OUTSIDE_DHAKA = "OUTSIDE_DHAKA",
    DHAKA_SUBURBS = "DHAKA_SUBURBS"
}
export declare class Order {
    id: number;
    user: User;
    items: OrderItem[];
    shippingAddress: string;
    status: OrderStatus;
    paymentMethod: PaymentMethod;
    deliveryType: DeliveryType;
    deliveryFee: number;
    orderNotes: string;
    deviceId: string;
    device: string;
    location: string;
    totalAmount: number;
    createdAt: Date;
    updatedAt: Date;
}
