import { Repository } from 'typeorm';
import { CreateTypeDto } from './dto/create-type.dto';
import { UpdateTypeDto } from './dto/update-type.dto';
import { Type } from './entities/type.entity';
export declare class TypesService {
    private readonly typeRepository;
    constructor(typeRepository: Repository<Type>);
    create(createTypeDto: CreateTypeDto): Promise<Type>;
    findAll(): Promise<Type[]>;
    findOne(id: number): Promise<Type>;
    update(id: number, updateTypeDto: UpdateTypeDto): Promise<Type>;
    remove(id: number): Promise<void>;
}
