import { Category } from '../../category/entities/category.entity';
import { SubCategory } from '../../sub-category/entities/sub-category.entity';
import { Brand } from '../../brands/entities/brand.entity';
import { Size } from '../../size/entities/size.entity';
import { Type } from '../../types/entities/type.entity';
export declare class Product {
    id: number;
    title: string;
    sku: string;
    originalPrice: number;
    currentPrice: number;
    stock: number;
    variantLabel: string;
    description: string;
    additionalInfo: string;
    features: string[];
    images: string[];
    thumbnail: string;
    sizes: Size[];
    types: Type[];
    category: Category;
    subCategory: SubCategory;
    brand: Brand;
    createdAt: Date;
    updatedAt: Date;
}
