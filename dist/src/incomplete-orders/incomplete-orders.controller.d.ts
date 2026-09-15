import { HttpStatus } from '@nestjs/common';
import { IncompleteOrdersService } from './incomplete-orders.service';
import { CreateIncompleteOrderDto } from './dto/create-incomplete-order.dto';
import { UpdateIncompleteOrderDto } from './dto/update-incomplete-order.dto';
export declare class IncompleteOrdersController {
    private readonly incompleteOrdersService;
    constructor(incompleteOrdersService: IncompleteOrdersService);
    create(createIncompleteOrderDto: CreateIncompleteOrderDto): Promise<{
        statusCode: HttpStatus;
        message: string;
        data: import("./entities/incomplete-order.entity").IncompleteOrder;
    }>;
    findAll(): Promise<{
        statusCode: HttpStatus;
        message: string;
        data: import("./entities/incomplete-order.entity").IncompleteOrder[];
    }>;
    findOne(id: string): Promise<{
        statusCode: HttpStatus;
        message: string;
        data: import("./entities/incomplete-order.entity").IncompleteOrder;
    }>;
    sendEmail(id: string): Promise<{
        statusCode: HttpStatus;
        message: string;
    }>;
    update(id: string, updateIncompleteOrderDto: UpdateIncompleteOrderDto): Promise<{
        statusCode: HttpStatus;
        message: string;
        data: import("./entities/incomplete-order.entity").IncompleteOrder;
    }>;
    remove(id: string): Promise<{
        statusCode: HttpStatus;
        message: string;
    }>;
}
