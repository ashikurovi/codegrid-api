export declare enum BlogStatus {
    DRAFT = "Draft",
    PUBLISHED = "Published"
}
export declare class Blog {
    id: number;
    title: string;
    excerpt: string;
    content: string;
    date: Date;
    image: string;
    status: BlogStatus;
    createdAt: Date;
    updatedAt: Date;
}
