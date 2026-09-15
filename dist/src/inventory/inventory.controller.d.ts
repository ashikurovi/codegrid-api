import { InventoryService } from './inventory.service';
import { CreateInventoryDto } from './dto/create-inventory.dto';
import { UpdateInventoryDto } from './dto/update-inventory.dto';
export declare class InventoryController {
    private readonly inventoryService;
    constructor(inventoryService: InventoryService);
    create(createInventoryDto: CreateInventoryDto): Promise<import("./entities/inventory.entity").Inventory>;
    findAll(): Promise<import("./entities/inventory.entity").Inventory[]>;
    findOne(id: string): Promise<import("./entities/inventory.entity").Inventory>;
    getHistory(id: string): Promise<import("./entities/stock-history.entity").StockHistory[]>;
    update(id: string, updateInventoryDto: UpdateInventoryDto): Promise<import("./entities/inventory.entity").Inventory>;
    remove(id: string): Promise<void>;
}
