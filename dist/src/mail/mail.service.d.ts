export declare class MailService {
    private transporter;
    private readonly logger;
    constructor();
    sendOrderStatusUpdateEmail(to: string, orderId: number, status: string): Promise<void>;
    sendCustomOrderStatusUpdateEmail(to: string, customOrderId: number, status: string): Promise<void>;
    sendAbandonedCartEmail(to: string, name: string): Promise<void>;
}
