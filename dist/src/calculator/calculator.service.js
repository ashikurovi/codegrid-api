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
exports.CalculatorService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const calculator_entity_1 = require("./entities/calculator.entity");
let CalculatorService = class CalculatorService {
    constructor(calculatorRepository) {
        this.calculatorRepository = calculatorRepository;
    }
    async create(createCalculatorDto) {
        const calculation = this.calculatorRepository.create(createCalculatorDto);
        return await this.calculatorRepository.save(calculation);
    }
    async findAll() {
        return await this.calculatorRepository.find({
            order: { createdAt: 'DESC' },
        });
    }
    async findOne(id) {
        const calculation = await this.calculatorRepository.findOne({ where: { id } });
        if (!calculation) {
            throw new common_1.NotFoundException(`Calculation #${id} not found`);
        }
        return calculation;
    }
    async update(id, updateCalculatorDto) {
        const calculation = await this.findOne(id);
        Object.assign(calculation, updateCalculatorDto);
        return await this.calculatorRepository.save(calculation);
    }
    async remove(id) {
        const calculation = await this.findOne(id);
        await this.calculatorRepository.remove(calculation);
    }
};
exports.CalculatorService = CalculatorService;
exports.CalculatorService = CalculatorService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(calculator_entity_1.Calculator)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], CalculatorService);
//# sourceMappingURL=calculator.service.js.map