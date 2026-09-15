import { BudgetPickService } from './budget-pick.service';
import { CreateBudgetPickDto } from './dto/create-budget-pick.dto';
import { UpdateBudgetPickDto } from './dto/update-budget-pick.dto';
export declare class BudgetPickController {
    private readonly budgetPickService;
    private readonly IMGBB_API_KEY;
    constructor(budgetPickService: BudgetPickService);
    private uploadToImgbb;
    create(createBudgetPickDto: CreateBudgetPickDto, file?: Express.Multer.File): Promise<import("./entities/budget-pick.entity").BudgetPick>;
    findAll(): Promise<import("./entities/budget-pick.entity").BudgetPick[]>;
    findOne(id: string): Promise<import("./entities/budget-pick.entity").BudgetPick>;
    update(id: string, updateBudgetPickDto: UpdateBudgetPickDto, file?: Express.Multer.File): Promise<import("./entities/budget-pick.entity").BudgetPick>;
    remove(id: string): Promise<void>;
}
