import { Category } from '../../category/entities/category.entity';
export declare class SubCategory {
    id: number;
    name: string;
    description: string;
    parentCategory: Category;
    createdAt: Date;
    updatedAt: Date;
}
