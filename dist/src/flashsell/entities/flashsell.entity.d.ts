import { Product } from '../../products/entities/product.entity';
export declare class Flashsell {
    id: number;
    title: string;
    discountPercentage: number;
    startDate: Date;
    endDate: Date;
    isActive: boolean;
    image: string;
    products: Product[];
    createdAt: Date;
    updatedAt: Date;
}
