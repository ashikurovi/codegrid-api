import { Repository } from 'typeorm';
import { CreateCalculatorDto } from './dto/create-calculator.dto';
import { UpdateCalculatorDto } from './dto/update-calculator.dto';
import { Calculator } from './entities/calculator.entity';
export declare class CalculatorService {
    private readonly calculatorRepository;
    constructor(calculatorRepository: Repository<Calculator>);
    create(createCalculatorDto: CreateCalculatorDto): Promise<Calculator>;
    findAll(): Promise<Calculator[]>;
    findOne(id: number): Promise<Calculator>;
    update(id: number, updateCalculatorDto: UpdateCalculatorDto): Promise<Calculator>;
    remove(id: number): Promise<void>;
}
