import { Repository } from 'typeorm';
import { CreateCustomOrderDto } from './dto/create-custom-order.dto';
import { UpdateCustomOrderDto } from './dto/update-custom-order.dto';
import { CustomOrder } from './entities/custom-order.entity';
import { MailService } from '../mail/mail.service';
import { UsersService } from '../users/users.service';
export declare class CustomOrdersService {
    private readonly customOrderRepository;
    private readonly mailService;
    private readonly usersService;
    constructor(customOrderRepository: Repository<CustomOrder>, mailService: MailService, usersService: UsersService);
    create(createCustomOrderDto: CreateCustomOrderDto): Promise<CustomOrder>;
    findAll(): Promise<CustomOrder[]>;
    findOne(id: number): Promise<CustomOrder>;
    update(id: number, updateCustomOrderDto: UpdateCustomOrderDto): Promise<CustomOrder>;
    updateStatus(id: number, status: string): Promise<CustomOrder>;
    remove(id: number): Promise<void>;
}
