import { Repository } from 'typeorm';
import { CreateSizeDto } from './dto/create-size.dto';
import { UpdateSizeDto } from './dto/update-size.dto';
import { Size } from './entities/size.entity';
export declare class SizeService {
    private readonly sizeRepository;
    constructor(sizeRepository: Repository<Size>);
    create(createSizeDto: CreateSizeDto): Promise<Size>;
    findAll(): Promise<Size[]>;
    findOne(id: number): Promise<Size>;
    update(id: number, updateSizeDto: UpdateSizeDto): Promise<Size>;
    remove(id: number): Promise<void>;
}
