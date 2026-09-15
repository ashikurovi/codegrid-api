import { Repository } from 'typeorm';
import { CreateCustomProductDto } from './dto/create-custom-product.dto';
import { UpdateCustomProductDto } from './dto/update-custom-product.dto';
import { CustomProduct } from './entities/custom-product.entity';
export declare class CustomProductsService {
    private readonly customProductRepository;
    constructor(customProductRepository: Repository<CustomProduct>);
    create(createCustomProductDto: CreateCustomProductDto): Promise<CustomProduct>;
    findAll(): Promise<CustomProduct[]>;
    findOne(id: number): Promise<CustomProduct>;
    update(id: number, updateCustomProductDto: UpdateCustomProductDto): Promise<CustomProduct>;
    remove(id: number): Promise<void>;
}
