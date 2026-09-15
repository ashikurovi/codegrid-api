import { Repository } from 'typeorm';
import { CreateIncompleteOrderDto } from './dto/create-incomplete-order.dto';
import { UpdateIncompleteOrderDto } from './dto/update-incomplete-order.dto';
import { IncompleteOrder } from './entities/incomplete-order.entity';
import { MailService } from '../mail/mail.service';
export declare class IncompleteOrdersService {
    private readonly incompleteOrderRepository;
    private readonly mailService;
    constructor(incompleteOrderRepository: Repository<IncompleteOrder>, mailService: MailService);
    create(createIncompleteOrderDto: CreateIncompleteOrderDto): Promise<IncompleteOrder>;
    findAll(): Promise<IncompleteOrder[]>;
    findOne(id: number): Promise<IncompleteOrder>;
    update(id: number, updateIncompleteOrderDto: UpdateIncompleteOrderDto): Promise<IncompleteOrder>;
    remove(id: number): Promise<void>;
    triggerAbandonedCartEmail(id: number): Promise<{
        message: string;
    }>;
}
