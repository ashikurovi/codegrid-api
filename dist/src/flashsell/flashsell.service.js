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
exports.FlashsellService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const flashsell_entity_1 = require("./entities/flashsell.entity");
const product_entity_1 = require("../products/entities/product.entity");
let FlashsellService = class FlashsellService {
    constructor(flashsellRepository, productRepository) {
        this.flashsellRepository = flashsellRepository;
        this.productRepository = productRepository;
    }
    async create(createFlashsellDto) {
        const { productIds, ...rest } = createFlashsellDto;
        const flashsell = this.flashsellRepository.create({
            ...rest,
            products: productIds?.length ? productIds.map(id => ({ id })) : undefined,
        });
        const savedFlashsell = await this.flashsellRepository.save(flashsell);
        if (productIds?.length && createFlashsellDto.discountPercentage) {
            await this.applyDiscountToProducts(productIds, createFlashsellDto.discountPercentage);
        }
        return savedFlashsell;
    }
    async findAll() {
        return await this.flashsellRepository.find({
            relations: {
                products: true,
            }
        });
    }
    async findOne(id) {
        const flashsell = await this.flashsellRepository.findOne({
            where: { id },
            relations: {
                products: true,
            }
        });
        if (!flashsell) {
            throw new common_1.NotFoundException(`Flashsell with ID ${id} not found`);
        }
        return flashsell;
    }
    async update(id, updateFlashsellDto) {
        const flashsell = await this.findOne(id);
        const { productIds, ...rest } = updateFlashsellDto;
        const updatedData = { ...rest };
        if (productIds !== undefined) {
            updatedData.products = productIds?.length ? productIds.map(pid => ({ id: pid })) : [];
        }
        const updatedFlashsell = this.flashsellRepository.merge(flashsell, updatedData);
        const savedFlashsell = await this.flashsellRepository.save(updatedFlashsell);
        const targetProductIds = productIds ?? flashsell.products?.map(p => p.id);
        const targetDiscount = updateFlashsellDto.discountPercentage ?? flashsell.discountPercentage;
        if (targetProductIds?.length && targetDiscount) {
            await this.applyDiscountToProducts(targetProductIds, targetDiscount);
        }
        return savedFlashsell;
    }
    async remove(id) {
        const flashsell = await this.findOne(id);
        await this.flashsellRepository.remove(flashsell);
    }
    async applyDiscountToProducts(productIds, discountPercentage) {
        const products = await this.productRepository.find({
            where: { id: (0, typeorm_2.In)(productIds) }
        });
        for (const product of products) {
            const discountAmount = (product.originalPrice * discountPercentage) / 100;
            product.currentPrice = Number((product.originalPrice - discountAmount).toFixed(2));
        }
        await this.productRepository.save(products);
    }
};
exports.FlashsellService = FlashsellService;
exports.FlashsellService = FlashsellService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(flashsell_entity_1.Flashsell)),
    __param(1, (0, typeorm_1.InjectRepository)(product_entity_1.Product)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], FlashsellService);
//# sourceMappingURL=flashsell.service.js.map