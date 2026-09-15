"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateSizeDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_size_dto_1 = require("./create-size.dto");
class UpdateSizeDto extends (0, mapped_types_1.PartialType)(create_size_dto_1.CreateSizeDto) {
}
exports.UpdateSizeDto = UpdateSizeDto;
//# sourceMappingURL=update-size.dto.js.map