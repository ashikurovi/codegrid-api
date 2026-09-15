import { Repository } from 'typeorm';
import { CreateBudgetPickDto } from './dto/create-budget-pick.dto';
import { UpdateBudgetPickDto } from './dto/update-budget-pick.dto';
import { BudgetPick } from './entities/budget-pick.entity';
export declare class BudgetPickService {
    private readonly budgetPickRepository;
    constructor(budgetPickRepository: Repository<BudgetPick>);
    create(createBudgetPickDto: CreateBudgetPickDto): Promise<BudgetPick>;
    findAll(): Promise<BudgetPick[]>;
    findOne(id: number): Promise<BudgetPick>;
    update(id: number, updateBudgetPickDto: UpdateBudgetPickDto): Promise<BudgetPick>;
    remove(id: number): Promise<void>;
}
