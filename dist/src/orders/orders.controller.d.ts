import { HttpStatus } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { UpdateOrderStatusDto } from './dto/update-order-status.dto';
export declare class OrdersController {
    private readonly ordersService;
    constructor(ordersService: OrdersService);
    create(createOrderDto: CreateOrderDto): Promise<{
        statusCode: HttpStatus;
        message: string;
        data: import("./entities/order.entity").Order;
    }>;
    findAll(): Promise<{
        statusCode: HttpStatus;
        message: string;
        data: import("./entities/order.entity").Order[];
    }>;
    findAllByUser(userId: string): Promise<{
        statusCode: HttpStatus;
        message: string;
        data: import("./entities/order.entity").Order[];
    }>;
    trackOrder(identifier: string): Promise<{
        statusCode: HttpStatus;
        message: string;
        data: import("./entities/order.entity").Order;
    }>;
    findOne(id: string): Promise<{
        statusCode: HttpStatus;
        message: string;
        data: import("./entities/order.entity").Order;
    }>;
    createPreOrder(createOrderDto: CreateOrderDto): Promise<{
        statusCode: HttpStatus;
        message: string;
        data: import("./entities/order.entity").Order;
    }>;
    convertPreOrder(id: string): Promise<{
        statusCode: HttpStatus;
        message: string;
        data: import("./entities/order.entity").Order;
    }>;
    updateStatus(id: string, updateOrderStatusDto: UpdateOrderStatusDto): Promise<{
        statusCode: HttpStatus;
        message: string;
        data: import("./entities/order.entity").Order;
    }>;
    update(id: string, updateOrderDto: UpdateOrderDto): Promise<{
        statusCode: HttpStatus;
        message: string;
        data: import("./entities/order.entity").Order;
    }>;
    remove(id: string): Promise<{
        statusCode: HttpStatus;
        message: string;
    }>;
}
