import { Repository } from 'typeorm';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Order } from './entities/order.entity';
import { MailService } from '../mail/mail.service';
import { InventoryService } from '../inventory/inventory.service';
import { Product } from '../products/entities/product.entity';
import { UsersService } from '../users/users.service';
export declare class OrdersService {
    private readonly orderRepository;
    private readonly inventoryService;
    private readonly productRepository;
    private readonly mailService;
    private readonly usersService;
    constructor(orderRepository: Repository<Order>, inventoryService: InventoryService, productRepository: Repository<Product>, mailService: MailService, usersService: UsersService);
    create(createOrderDto: CreateOrderDto): Promise<Order>;
    findAll(): Promise<Order[]>;
    findAllByUser(userId: number): Promise<Order[]>;
    trackOrder(identifier: string): Promise<Order>;
    findOne(id: number): Promise<Order>;
    update(id: number, updateOrderDto: UpdateOrderDto): Promise<Order>;
    updateStatus(id: number, status: string): Promise<Order>;
    remove(id: number): Promise<void>;
}
