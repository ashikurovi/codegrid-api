export declare enum CustomProductCategory {
    APPAREL = "Apparel",
    BOTTLES = "Bottles",
    CORPORATE = "Corporate"
}
export declare enum CustomProductStatus {
    ACTIVE = "Active",
    INACTIVE = "Inactive"
}
export declare class CustomProduct {
    id: number;
    productName: string;
    category: CustomProductCategory;
    price: string;
    status: CustomProductStatus;
    description: string;
    discount: string;
    image: string;
    packageItems: {
        name: string;
        imageUrl?: string;
    }[];
    createdAt: Date;
    updatedAt: Date;
}
