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
exports.IncompleteOrder = exports.IncompleteOrderStatus = void 0;
const typeorm_1 = require("typeorm");
var IncompleteOrderStatus;
(function (IncompleteOrderStatus) {
    IncompleteOrderStatus["PENDING"] = "Pending";
    IncompleteOrderStatus["RECOVERED"] = "Recovered";
    IncompleteOrderStatus["LOST"] = "Lost";
})(IncompleteOrderStatus || (exports.IncompleteOrderStatus = IncompleteOrderStatus = {}));
let IncompleteOrder = class IncompleteOrder {
};
exports.IncompleteOrder = IncompleteOrder;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], IncompleteOrder.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], IncompleteOrder.prototype, "customerName", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], IncompleteOrder.prototype, "customerEmail", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], IncompleteOrder.prototype, "customerPhone", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'jsonb', nullable: true }),
    __metadata("design:type", Array)
], IncompleteOrder.prototype, "selectedProducts", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: IncompleteOrderStatus,
        default: IncompleteOrderStatus.PENDING,
    }),
    __metadata("design:type", String)
], IncompleteOrder.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], IncompleteOrder.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], IncompleteOrder.prototype, "updatedAt", void 0);
exports.IncompleteOrder = IncompleteOrder = __decorate([
    (0, typeorm_1.Entity)('incomplete_orders')
], IncompleteOrder);
//# sourceMappingURL=incomplete-order.entity.js.map