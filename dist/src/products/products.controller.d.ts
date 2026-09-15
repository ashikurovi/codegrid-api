import { HttpStatus } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
export declare class ProductsController {
    private readonly productsService;
    private readonly IMGBB_API_KEY;
    constructor(productsService: ProductsService);
    private uploadToImgbb;
    create(createProductDto: CreateProductDto, files?: {
        thumbnail?: Express.Multer.File[];
        images?: Express.Multer.File[];
    }): Promise<{
        statusCode: HttpStatus;
        message: string;
        data: import("./entities/product.entity").Product;
    }>;
    findAll(): Promise<{
        statusCode: HttpStatus;
        message: string;
        data: import("./entities/product.entity").Product[];
    }>;
    findOne(id: string): Promise<{
        statusCode: HttpStatus;
        message: string;
        data: import("./entities/product.entity").Product;
    }>;
    update(id: string, updateProductDto: UpdateProductDto, files?: {
        thumbnail?: Express.Multer.File[];
        images?: Express.Multer.File[];
    }): Promise<{
        statusCode: HttpStatus;
        message: string;
        data: import("./entities/product.entity").Product;
    }>;
    remove(id: string): Promise<{
        statusCode: HttpStatus;
        message: string;
    }>;
}
