"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.IncompleteOrdersModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const incomplete_orders_service_1 = require("./incomplete-orders.service");
const incomplete_orders_controller_1 = require("./incomplete-orders.controller");
const incomplete_order_entity_1 = require("./entities/incomplete-order.entity");
const mail_module_1 = require("../mail/mail.module");
let IncompleteOrdersModule = class IncompleteOrdersModule {
};
exports.IncompleteOrdersModule = IncompleteOrdersModule;
exports.IncompleteOrdersModule = IncompleteOrdersModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([incomplete_order_entity_1.IncompleteOrder]), mail_module_1.MailModule],
        controllers: [incomplete_orders_controller_1.IncompleteOrdersController],
        providers: [incomplete_orders_service_1.IncompleteOrdersService],
        exports: [incomplete_orders_service_1.IncompleteOrdersService],
    })
], IncompleteOrdersModule);
//# sourceMappingURL=incomplete-orders.module.js.map