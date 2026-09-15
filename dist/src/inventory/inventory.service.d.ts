import { Repository } from 'typeorm';
import { CreateInventoryDto } from './dto/create-inventory.dto';
import { UpdateInventoryDto } from './dto/update-inventory.dto';
import { Inventory } from './entities/inventory.entity';
import { Product } from '../products/entities/product.entity';
import { StockHistory } from './entities/stock-history.entity';
export declare class InventoryService {
    private readonly inventoryRepository;
    private readonly productRepository;
    private readonly stockHistoryRepository;
    constructor(inventoryRepository: Repository<Inventory>, productRepository: Repository<Product>, stockHistoryRepository: Repository<StockHistory>);
    logHistory(inventory: Inventory, changeAmount: number, reason: string): Promise<void>;
    getHistory(inventoryId: number): Promise<StockHistory[]>;
    create(createInventoryDto: CreateInventoryDto): Promise<Inventory>;
    findAll(): Promise<Inventory[]>;
    findOne(id: number): Promise<Inventory>;
    update(id: number, updateInventoryDto: UpdateInventoryDto): Promise<Inventory>;
    remove(id: number): Promise<void>;
    adjustStockByProduct(productTitle: string, changeAmount: number, reason: string): Promise<Inventory | null>;
}
