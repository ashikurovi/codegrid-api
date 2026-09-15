import { CalculatorService } from './calculator.service';
import { CreateCalculatorDto } from './dto/create-calculator.dto';
import { UpdateCalculatorDto } from './dto/update-calculator.dto';
export declare class CalculatorController {
    private readonly calculatorService;
    constructor(calculatorService: CalculatorService);
    create(createCalculatorDto: CreateCalculatorDto): Promise<import("./entities/calculator.entity").Calculator>;
    findAll(): Promise<import("./entities/calculator.entity").Calculator[]>;
    findOne(id: string): Promise<import("./entities/calculator.entity").Calculator>;
    update(id: string, updateCalculatorDto: UpdateCalculatorDto): Promise<import("./entities/calculator.entity").Calculator>;
    remove(id: string): Promise<void>;
}
