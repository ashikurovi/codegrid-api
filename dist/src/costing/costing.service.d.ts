import { Repository } from 'typeorm';
import { Costing } from './entities/costing.entity';
import { CreateCostingDto } from './dto/create-costing.dto';
import { UpdateCostingDto } from './dto/update-costing.dto';
export declare class CostingService {
    private readonly costingRepository;
    constructor(costingRepository: Repository<Costing>);
    create(dto: CreateCostingDto): Promise<Costing>;
    findAll(): Promise<Costing[]>;
    findOne(id: number): Promise<Costing>;
    update(id: number, dto: UpdateCostingDto): Promise<Costing>;
    remove(id: number): Promise<void>;
    getSummary(): Promise<{
        totalCost: number;
        recordsCount: number;
        records: Costing[];
    }>;
}
