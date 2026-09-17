import { OrderStatus, PaymentMethod, DeliveryType } from '../entities/order.entity';
declare class OrderItemDto {
    productId: number;
    quantity: number;
}
export declare class CreateOrderDto {
    userId?: number;
    items: OrderItemDto[];
    shippingAddress: string;
    status?: OrderStatus;
    paymentMethod?: PaymentMethod;
    deliveryType?: DeliveryType;
    deliveryFee?: number;
    orderNotes?: string;
    totalAmount: number;
    customerName?: string;
    customerEmail?: string;
    customerPhone?: string;
    deviceId?: string;
    device?: string;
    location?: string;
    couponCode?: string;
    discountAmount?: number;
}
export {};
