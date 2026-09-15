import { HttpStatus } from '@nestjs/common';
import { SubCategoryService } from './sub-category.service';
import { CreateSubCategoryDto } from './dto/create-sub-category.dto';
import { UpdateSubCategoryDto } from './dto/update-sub-category.dto';
export declare class SubCategoryController {
    private readonly subCategoryService;
    constructor(subCategoryService: SubCategoryService);
    create(createSubCategoryDto: CreateSubCategoryDto): Promise<{
        statusCode: HttpStatus;
        message: string;
        data: import("./entities/sub-category.entity").SubCategory;
    }>;
    findAll(): Promise<{
        statusCode: HttpStatus;
        message: string;
        data: import("./entities/sub-category.entity").SubCategory[];
    }>;
    findOne(id: string): Promise<{
        statusCode: HttpStatus;
        message: string;
        data: import("./entities/sub-category.entity").SubCategory;
    }>;
    update(id: string, updateSubCategoryDto: UpdateSubCategoryDto): Promise<{
        statusCode: HttpStatus;
        message: string;
        data: import("./entities/sub-category.entity").SubCategory;
    }>;
    remove(id: string): Promise<{
        statusCode: HttpStatus;
        message: string;
    }>;
}
