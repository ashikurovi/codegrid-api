import { HttpStatus } from '@nestjs/common';
import { BrandsService } from './brands.service';
import { CreateBrandDto } from './dto/create-brand.dto';
import { UpdateBrandDto } from './dto/update-brand.dto';
export declare class BrandsController {
    private readonly brandsService;
    private readonly IMGBB_API_KEY;
    constructor(brandsService: BrandsService);
    private uploadToImgbb;
    create(createBrandDto: CreateBrandDto, file?: Express.Multer.File): Promise<{
        statusCode: HttpStatus;
        message: string;
        data: import("./entities/brand.entity").Brand;
    }>;
    findAll(): Promise<{
        statusCode: HttpStatus;
        message: string;
        data: import("./entities/brand.entity").Brand[];
    }>;
    findOne(id: string): Promise<{
        statusCode: HttpStatus;
        message: string;
        data: import("./entities/brand.entity").Brand;
    }>;
    update(id: string, updateBrandDto: UpdateBrandDto, file?: Express.Multer.File): Promise<{
        statusCode: HttpStatus;
        message: string;
        data: import("./entities/brand.entity").Brand;
    }>;
    remove(id: string): Promise<{
        statusCode: HttpStatus;
        message: string;
    }>;
}
