"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CostingModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const costing_entity_1 = require("./entities/costing.entity");
const costing_service_1 = require("./costing.service");
const costing_controller_1 = require("./costing.controller");
let CostingModule = class CostingModule {
};
exports.CostingModule = CostingModule;
exports.CostingModule = CostingModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([costing_entity_1.Costing])],
        controllers: [costing_controller_1.CostingController],
        providers: [costing_service_1.CostingService],
        exports: [costing_service_1.CostingService],
    })
], CostingModule);
//# sourceMappingURL=costing.module.js.map