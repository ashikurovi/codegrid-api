import { Product } from '../../products/entities/product.entity';
export declare class BudgetPick {
    id: number;
    title: string;
    description: string;
    packagePrice: number;
    isActive: boolean;
    image: string;
    products: Product[];
    createdAt: Date;
    updatedAt: Date;
}
