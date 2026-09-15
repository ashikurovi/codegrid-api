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
Object.defineProperty(exports, "__esModule", { value: true });
exports.StockHistory = void 0;
const typeorm_1 = require("typeorm");
const inventory_entity_1 = require("./inventory.entity");
let StockHistory = class StockHistory {
};
exports.StockHistory = StockHistory;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], StockHistory.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => inventory_entity_1.Inventory, (inventory) => inventory.history, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'inventoryId' }),
    __metadata("design:type", inventory_entity_1.Inventory)
], StockHistory.prototype, "inventory", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], StockHistory.prototype, "changeAmount", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], StockHistory.prototype, "reason", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], StockHistory.prototype, "createdAt", void 0);
exports.StockHistory = StockHistory = __decorate([
    (0, typeorm_1.Entity)('stock_history')
], StockHistory);
//# sourceMappingURL=stock-history.entity.js.map