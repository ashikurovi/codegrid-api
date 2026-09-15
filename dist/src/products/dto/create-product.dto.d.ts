export declare class CreateProductDto {
    title: string;
    originalPrice: number;
    currentPrice: number;
    variantLabel?: string;
    description?: string;
    additionalInfo?: string;
    features?: string[];
    images?: string[];
    thumbnail?: string;
    sizeIds?: number[];
    typeIds?: number[];
    categoryId?: number;
    subCategoryId?: number;
    brandId?: number;
}
