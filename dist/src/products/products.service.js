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
exports.ProductsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const product_entity_1 = require("./entities/product.entity");
let ProductsService = class ProductsService {
    constructor(productRepository) {
        this.productRepository = productRepository;
    }
    async create(createProductDto) {
        const { categoryId, subCategoryId, brandId, sizeIds, typeIds, ...rest } = createProductDto;
        const product = this.productRepository.create({
            ...rest,
            category: categoryId ? { id: categoryId } : undefined,
            subCategory: subCategoryId ? { id: subCategoryId } : undefined,
            brand: brandId ? { id: brandId } : undefined,
            sizes: sizeIds?.length ? sizeIds.map(id => ({ id })) : undefined,
            types: typeIds?.length ? typeIds.map(id => ({ id })) : undefined,
        });
        return await this.productRepository.save(product);
    }
    async findAll() {
        return await this.productRepository.find({
            relations: {
                category: true,
                subCategory: true,
                brand: true,
                sizes: true,
                types: true,
            },
            select: {
                id: true,
                title: true,
                originalPrice: true,
                currentPrice: true,
                stock: true,
                thumbnail: true,
                images: true,
                category: { id: true, name: true },
                subCategory: { id: true, name: true },
                brand: { id: true, name: true },
                sizes: { id: true, name: true },
                types: { id: true, name: true }
            }
        });
    }
    async findOne(id) {
        const product = await this.productRepository.findOne({
            where: { id },
            relations: {
                category: true,
                subCategory: true,
                brand: true,
                sizes: true,
                types: true,
            },
            select: {
                id: true,
                title: true,
                originalPrice: true,
                currentPrice: true,
                stock: true,
                variantLabel: true,
                description: true,
                additionalInfo: true,
                features: true,
                thumbnail: true,
                images: true,
                category: { id: true, name: true },
                subCategory: { id: true, name: true },
                brand: { id: true, name: true },
                sizes: { id: true, name: true },
                types: { id: true, name: true }
            }
        });
        if (!product) {
            throw new common_1.NotFoundException(`Product with ID ${id} not found`);
        }
        return product;
    }
    async update(id, updateProductDto) {
        const product = await this.findOne(id);
        const { categoryId, subCategoryId, brandId, sizeIds, typeIds, ...rest } = updateProductDto;
        const updatedData = { ...rest };
        if (categoryId !== undefined) {
            updatedData.category = categoryId ? { id: categoryId } : null;
        }
        if (subCategoryId !== undefined) {
            updatedData.subCategory = subCategoryId ? { id: subCategoryId } : null;
        }
        if (brandId !== undefined) {
            updatedData.brand = brandId ? { id: brandId } : null;
        }
        if (sizeIds !== undefined) {
            updatedData.sizes = sizeIds?.length ? sizeIds.map(id => ({ id })) : [];
        }
        if (typeIds !== undefined) {
            updatedData.types = typeIds?.length ? typeIds.map(id => ({ id })) : [];
        }
        const updatedProduct = this.productRepository.merge(product, updatedData);
        return await this.productRepository.save(updatedProduct);
    }
    async remove(id) {
        const product = await this.findOne(id);
        await this.productRepository.remove(product);
    }
};
exports.ProductsService = ProductsService;
exports.ProductsService = ProductsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(product_entity_1.Product)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], ProductsService);
//# sourceMappingURL=products.service.js.map