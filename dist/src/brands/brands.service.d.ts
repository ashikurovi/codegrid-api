import { Repository } from 'typeorm';
import { CreateBrandDto } from './dto/create-brand.dto';
import { UpdateBrandDto } from './dto/update-brand.dto';
import { Brand } from './entities/brand.entity';
export declare class BrandsService {
    private brandsRepository;
    constructor(brandsRepository: Repository<Brand>);
    create(createBrandDto: CreateBrandDto): Promise<Brand>;
    findAll(): Promise<Brand[]>;
    findOne(id: number): Promise<Brand>;
    update(id: number, updateBrandDto: UpdateBrandDto): Promise<Brand>;
    remove(id: number): Promise<void>;
}
