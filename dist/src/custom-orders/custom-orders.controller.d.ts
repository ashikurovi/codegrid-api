import { HttpStatus } from '@nestjs/common';
import { CustomOrdersService } from './custom-orders.service';
import { CreateCustomOrderDto } from './dto/create-custom-order.dto';
import { UpdateCustomOrderDto } from './dto/update-custom-order.dto';
import { UpdateCustomOrderStatusDto } from './dto/update-custom-order-status.dto';
export declare class CustomOrdersController {
    private readonly customOrdersService;
    private readonly IMGBB_API_KEY;
    constructor(customOrdersService: CustomOrdersService);
    private uploadToImgbb;
    create(createCustomOrderDto: CreateCustomOrderDto, file?: Express.Multer.File): Promise<{
        statusCode: HttpStatus;
        message: string;
        data: import("./entities/custom-order.entity").CustomOrder;
    }>;
    findAll(): Promise<{
        statusCode: HttpStatus;
        message: string;
        data: import("./entities/custom-order.entity").CustomOrder[];
    }>;
    findOne(id: string): Promise<{
        statusCode: HttpStatus;
        message: string;
        data: import("./entities/custom-order.entity").CustomOrder;
    }>;
    updateStatus(id: string, updateCustomOrderStatusDto: UpdateCustomOrderStatusDto): Promise<{
        statusCode: HttpStatus;
        message: string;
        data: import("./entities/custom-order.entity").CustomOrder;
    }>;
    update(id: string, updateCustomOrderDto: UpdateCustomOrderDto, file?: Express.Multer.File): Promise<{
        statusCode: HttpStatus;
        message: string;
        data: import("./entities/custom-order.entity").CustomOrder;
    }>;
    remove(id: string): Promise<{
        statusCode: HttpStatus;
        message: string;
    }>;
}
