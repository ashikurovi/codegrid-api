"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InventoryService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const inventory_entity_1 = require("./entities/inventory.entity");
const product_entity_1 = require("../products/entities/product.entity");
const stock_history_entity_1 = require("./entities/stock-history.entity");
let InventoryService = class InventoryService {
    constructor(inventoryRepository, productRepository, stockHistoryRepository) {
        this.inventoryRepository = inventoryRepository;
        this.productRepository = productRepository;
        this.stockHistoryRepository = stockHistoryRepository;
    }
    async logHistory(inventory, changeAmount, reason) {
        const history = this.stockHistoryRepository.create({
            inventory,
            changeAmount,
            reason,
        });
        await this.stockHistoryRepository.save(history);
    }
    async getHistory(inventoryId) {
        return await this.stockHistoryRepository.find({
            where: { inventory: { id: inventoryId } },
            order: { createdAt: 'DESC' },
        });
    }
    async create(createInventoryDto) {
        const inventory = this.inventoryRepository.create(createInventoryDto);
        const savedInventory = await this.inventoryRepository.save(inventory);
        if (savedInventory.product && savedInventory.stock) {
            const productEntity = await this.productRepository.findOne({ where: { title: savedInventory.product } });
            if (productEntity) {
                productEntity.stock = (productEntity.stock || 0) + savedInventory.stock;
                await this.productRepository.save(productEntity);
            }
        }
        if (savedInventory.stock) {
            await this.logHistory(savedInventory, savedInventory.stock, `Initial Stock added by Admin`);
        }
        return savedInventory;
    }
    async findAll() {
        return await this.inventoryRepository.find({
            order: { createdAt: 'DESC' },
        });
    }
    async findOne(id) {
        const inventory = await this.inventoryRepository.findOne({ where: { id } });
        if (!inventory) {
            throw new common_1.NotFoundException(`Inventory #${id} not found`);
        }
        return inventory;
    }
    async update(id, updateInventoryDto) {
        const inventory = await this.findOne(id);
        const oldStock = inventory.stock;
        Object.assign(inventory, updateInventoryDto);
        const updatedInventory = await this.inventoryRepository.save(inventory);
        if (updateInventoryDto.stock !== undefined && updateInventoryDto.stock !== oldStock) {
            const difference = updateInventoryDto.stock - oldStock;
            const amountStr = difference > 0 ? `+${difference}` : `${difference}`;
            await this.logHistory(updatedInventory, difference, `Manual Adjustment by Admin`);
        }
        return updatedInventory;
    }
    async remove(id) {
        const inventory = await this.findOne(id);
        await this.inventoryRepository.remove(inventory);
    }
    async adjustStockByProduct(productTitle, changeAmount, reason) {
        const inventory = await this.inventoryRepository.findOne({ where: { product: productTitle } });
        if (!inventory)
            return null;
        inventory.stock = Math.max(0, inventory.stock + changeAmount);
        const updatedInventory = await this.inventoryRepository.save(inventory);
        await this.logHistory(updatedInventory, changeAmount, reason);
        return updatedInventory;
    }
};
exports.InventoryService = InventoryService;
exports.InventoryService = InventoryService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(inventory_entity_1.Inventory)),
    __param(1, (0, typeorm_1.InjectRepository)(product_entity_1.Product)),
    __param(2, (0, typeorm_1.InjectRepository)(stock_history_entity_1.StockHistory)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], InventoryService);
//# sourceMappingURL=inventory.service.js.map