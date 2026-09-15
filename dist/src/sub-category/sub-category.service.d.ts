import { Repository } from 'typeorm';
import { CreateSubCategoryDto } from './dto/create-sub-category.dto';
import { UpdateSubCategoryDto } from './dto/update-sub-category.dto';
import { SubCategory } from './entities/sub-category.entity';
export declare class SubCategoryService {
    private readonly subCategoryRepository;
    constructor(subCategoryRepository: Repository<SubCategory>);
    create(createSubCategoryDto: CreateSubCategoryDto): Promise<SubCategory>;
    findAll(): Promise<SubCategory[]>;
    findOne(id: number): Promise<SubCategory>;
    update(id: number, updateSubCategoryDto: UpdateSubCategoryDto): Promise<SubCategory>;
    remove(id: number): Promise<void>;
}
