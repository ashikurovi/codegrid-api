"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FlashsellModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const flashsell_service_1 = require("./flashsell.service");
const flashsell_controller_1 = require("./flashsell.controller");
const flashsell_entity_1 = require("./entities/flashsell.entity");
const product_entity_1 = require("../products/entities/product.entity");
let FlashsellModule = class FlashsellModule {
};
exports.FlashsellModule = FlashsellModule;
exports.FlashsellModule = FlashsellModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([flashsell_entity_1.Flashsell, product_entity_1.Product])],
        controllers: [flashsell_controller_1.FlashsellController],
        providers: [flashsell_service_1.FlashsellService],
    })
], FlashsellModule);
//# sourceMappingURL=flashsell.module.js.map