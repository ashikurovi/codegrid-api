"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateCustomProductDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_custom_product_dto_1 = require("./create-custom-product.dto");
class UpdateCustomProductDto extends (0, mapped_types_1.PartialType)(create_custom_product_dto_1.CreateCustomProductDto) {
}
exports.UpdateCustomProductDto = UpdateCustomProductDto;
//# sourceMappingURL=update-custom-product.dto.js.map