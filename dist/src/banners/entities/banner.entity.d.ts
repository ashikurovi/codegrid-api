export declare enum BannerStatus {
    ACTIVE = "Active",
    INACTIVE = "Inactive"
}
export declare class Banner {
    id: number;
    title: string;
    subtitle: string;
    tag: string;
    link: string;
    image: string;
    status: BannerStatus;
    order: number;
    createdAt: Date;
    updatedAt: Date;
}
