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
exports.CustomOrder = exports.CustomOrderStatus = void 0;
const typeorm_1 = require("typeorm");
const user_entity_1 = require("../../users/entities/user.entity");
const custom_product_entity_1 = require("../../custom-products/entities/custom-product.entity");
var CustomOrderStatus;
(function (CustomOrderStatus) {
    CustomOrderStatus["NEW_REQUEST"] = "New Request";
    CustomOrderStatus["QUOTED"] = "Quoted";
    CustomOrderStatus["IN_PRODUCTION"] = "In Production";
    CustomOrderStatus["DELIVERED"] = "Delivered";
})(CustomOrderStatus || (exports.CustomOrderStatus = CustomOrderStatus = {}));
let CustomOrder = class CustomOrder {
};
exports.CustomOrder = CustomOrder;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], CustomOrder.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => custom_product_entity_1.CustomProduct, { onDelete: 'SET NULL', nullable: true }),
    (0, typeorm_1.JoinColumn)({ name: 'customProductId' }),
    __metadata("design:type", custom_product_entity_1.CustomProduct)
], CustomOrder.prototype, "customProduct", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, { onDelete: 'SET NULL', nullable: true }),
    (0, typeorm_1.JoinColumn)({ name: 'userId' }),
    __metadata("design:type", user_entity_1.User)
], CustomOrder.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', nullable: true }),
    __metadata("design:type", String)
], CustomOrder.prototype, "customerName", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', nullable: true }),
    __metadata("design:type", String)
], CustomOrder.prototype, "customerPhone", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', nullable: true }),
    __metadata("design:type", String)
], CustomOrder.prototype, "customerEmail", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], CustomOrder.prototype, "category", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], CustomOrder.prototype, "item", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 1 }),
    __metadata("design:type", Number)
], CustomOrder.prototype, "quantity", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], CustomOrder.prototype, "details", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', nullable: true }),
    __metadata("design:type", String)
], CustomOrder.prototype, "designReference", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: CustomOrderStatus,
        default: CustomOrderStatus.NEW_REQUEST,
    }),
    __metadata("design:type", String)
], CustomOrder.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', precision: 10, scale: 2, nullable: true }),
    __metadata("design:type", Number)
], CustomOrder.prototype, "price", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], CustomOrder.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], CustomOrder.prototype, "updatedAt", void 0);
exports.CustomOrder = CustomOrder = __decorate([
    (0, typeorm_1.Entity)('custom_orders')
], CustomOrder);
//# sourceMappingURL=custom-order.entity.js.map