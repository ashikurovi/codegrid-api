"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateIncompleteOrderDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_incomplete_order_dto_1 = require("./create-incomplete-order.dto");
class UpdateIncompleteOrderDto extends (0, mapped_types_1.PartialType)(create_incomplete_order_dto_1.CreateIncompleteOrderDto) {
}
exports.UpdateIncompleteOrderDto = UpdateIncompleteOrderDto;
//# sourceMappingURL=update-incomplete-order.dto.js.map