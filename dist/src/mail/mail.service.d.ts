export declare class MailService {
    private transporter;
    private readonly logger;
    private escapeHtml;
    constructor();
    sendNewOrderNotification(order: {
        orderId: number;
        customerName?: string;
        customerEmail?: string;
        customerPhone?: string;
        shippingAddress: string;
        paymentMethod?: string;
        deliveryType?: string;
        totalAmount: number;
        deviceId?: string;
        device?: string;
        location?: string;
        items?: {
            productId: number;
            quantity: number;
        }[];
    }): Promise<void>;
    sendOrderStatusUpdateEmail(to: string, orderId: number, status: string): Promise<void>;
    sendCustomOrderStatusUpdateEmail(to: string, customOrderId: number, status: string): Promise<void>;
    sendAbandonedCartEmail(to: string, name: string): Promise<void>;
}
