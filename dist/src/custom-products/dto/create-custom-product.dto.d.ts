import { CustomProductCategory, CustomProductStatus } from '../entities/custom-product.entity';
declare class PackageItemDto {
    name: string;
    imageUrl?: string;
}
export declare class CreateCustomProductDto {
    productName: string;
    category: CustomProductCategory;
    price: string;
    dtfPrintCost?: number;
    a4PrintCost?: number;
    status: CustomProductStatus;
    description?: string;
    discount?: string;
    image?: string;
    packageItems?: PackageItemDto[];
}
export {};
