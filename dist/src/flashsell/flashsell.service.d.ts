import { Repository } from 'typeorm';
import { CreateFlashsellDto } from './dto/create-flashsell.dto';
import { UpdateFlashsellDto } from './dto/update-flashsell.dto';
import { Flashsell } from './entities/flashsell.entity';
import { Product } from '../products/entities/product.entity';
export declare class FlashsellService {
    private readonly flashsellRepository;
    private readonly productRepository;
    constructor(flashsellRepository: Repository<Flashsell>, productRepository: Repository<Product>);
    create(createFlashsellDto: CreateFlashsellDto): Promise<Flashsell>;
    findAll(): Promise<Flashsell[]>;
    findOne(id: number): Promise<Flashsell>;
    update(id: number, updateFlashsellDto: UpdateFlashsellDto): Promise<Flashsell>;
    remove(id: number): Promise<void>;
    private applyDiscountToProducts;
}
