import { HttpStatus } from '@nestjs/common';
import { CustomProductsService } from './custom-products.service';
import { CreateCustomProductDto } from './dto/create-custom-product.dto';
import { UpdateCustomProductDto } from './dto/update-custom-product.dto';
export declare class CustomProductsController {
    private readonly customProductsService;
    constructor(customProductsService: CustomProductsService);
    create(createCustomProductDto: CreateCustomProductDto): Promise<{
        statusCode: HttpStatus;
        message: string;
        data: import("./entities/custom-product.entity").CustomProduct;
    }>;
    findAll(): Promise<{
        statusCode: HttpStatus;
        message: string;
        data: import("./entities/custom-product.entity").CustomProduct[];
    }>;
    findOne(id: string): Promise<{
        statusCode: HttpStatus;
        message: string;
        data: import("./entities/custom-product.entity").CustomProduct;
    }>;
    update(id: string, updateCustomProductDto: UpdateCustomProductDto): Promise<{
        statusCode: HttpStatus;
        message: string;
        data: import("./entities/custom-product.entity").CustomProduct;
    }>;
    remove(id: string): Promise<{
        statusCode: HttpStatus;
        message: string;
    }>;
}
