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
exports.CustomProduct = exports.CustomProductStatus = exports.CustomProductCategory = void 0;
const typeorm_1 = require("typeorm");
var CustomProductCategory;
(function (CustomProductCategory) {
    CustomProductCategory["APPAREL"] = "Apparel";
    CustomProductCategory["BOTTLES"] = "Bottles";
    CustomProductCategory["CORPORATE"] = "Corporate";
})(CustomProductCategory || (exports.CustomProductCategory = CustomProductCategory = {}));
var CustomProductStatus;
(function (CustomProductStatus) {
    CustomProductStatus["ACTIVE"] = "Active";
    CustomProductStatus["INACTIVE"] = "Inactive";
})(CustomProductStatus || (exports.CustomProductStatus = CustomProductStatus = {}));
let CustomProduct = class CustomProduct {
};
exports.CustomProduct = CustomProduct;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], CustomProduct.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], CustomProduct.prototype, "productName", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: CustomProductCategory,
        default: CustomProductCategory.APPAREL,
    }),
    __metadata("design:type", String)
], CustomProduct.prototype, "category", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], CustomProduct.prototype, "price", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: CustomProductStatus,
        default: CustomProductStatus.ACTIVE,
    }),
    __metadata("design:type", String)
], CustomProduct.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], CustomProduct.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], CustomProduct.prototype, "discount", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], CustomProduct.prototype, "image", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'jsonb', nullable: true }),
    __metadata("design:type", Array)
], CustomProduct.prototype, "packageItems", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], CustomProduct.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], CustomProduct.prototype, "updatedAt", void 0);
exports.CustomProduct = CustomProduct = __decorate([
    (0, typeorm_1.Entity)('custom_products')
], CustomProduct);
//# sourceMappingURL=custom-product.entity.js.map