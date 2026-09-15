"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateCustomOrderDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_custom_order_dto_1 = require("./create-custom-order.dto");
class UpdateCustomOrderDto extends (0, mapped_types_1.PartialType)(create_custom_order_dto_1.CreateCustomOrderDto) {
}
exports.UpdateCustomOrderDto = UpdateCustomOrderDto;
//# sourceMappingURL=update-custom-order.dto.js.map