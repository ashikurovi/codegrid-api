export declare enum IncompleteOrderStatus {
    PENDING = "Pending",
    RECOVERED = "Recovered",
    LOST = "Lost"
}
export declare class IncompleteOrder {
    id: number;
    customerName: string;
    customerEmail: string;
    customerPhone: string;
    selectedProducts: {
        productId: number;
        quantity: number;
        productName?: string;
    }[];
    status: IncompleteOrderStatus;
    createdAt: Date;
    updatedAt: Date;
}
