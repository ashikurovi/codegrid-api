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
exports.SubCategoryService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const sub_category_entity_1 = require("./entities/sub-category.entity");
let SubCategoryService = class SubCategoryService {
    constructor(subCategoryRepository) {
        this.subCategoryRepository = subCategoryRepository;
    }
    async create(createSubCategoryDto) {
        const subCategory = this.subCategoryRepository.create({
            name: createSubCategoryDto.name,
            description: createSubCategoryDto.description,
            parentCategory: { id: createSubCategoryDto.parentCategoryId }
        });
        try {
            return await this.subCategoryRepository.save(subCategory);
        }
        catch (error) {
            throw new common_1.InternalServerErrorException('Error creating sub-category');
        }
    }
    async findAll() {
        return await this.subCategoryRepository.find({ relations: { parentCategory: true } });
    }
    async findOne(id) {
        const subCategory = await this.subCategoryRepository.findOne({
            where: { id },
            relations: { parentCategory: true }
        });
        if (!subCategory) {
            throw new common_1.NotFoundException(`Sub-category with ID ${id} not found`);
        }
        return subCategory;
    }
    async update(id, updateSubCategoryDto) {
        const subCategory = await this.findOne(id);
        if (updateSubCategoryDto.name)
            subCategory.name = updateSubCategoryDto.name;
        if (updateSubCategoryDto.description)
            subCategory.description = updateSubCategoryDto.description;
        if (updateSubCategoryDto.parentCategoryId) {
            subCategory.parentCategory = { id: updateSubCategoryDto.parentCategoryId };
        }
        try {
            return await this.subCategoryRepository.save(subCategory);
        }
        catch (error) {
            throw new common_1.InternalServerErrorException('Error updating sub-category');
        }
    }
    async remove(id) {
        const subCategory = await this.findOne(id);
        await this.subCategoryRepository.remove(subCategory);
    }
};
exports.SubCategoryService = SubCategoryService;
exports.SubCategoryService = SubCategoryService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(sub_category_entity_1.SubCategory)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], SubCategoryService);
//# sourceMappingURL=sub-category.service.js.map