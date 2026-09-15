"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateFlashsellDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_flashsell_dto_1 = require("./create-flashsell.dto");
class UpdateFlashsellDto extends (0, mapped_types_1.PartialType)(create_flashsell_dto_1.CreateFlashsellDto) {
}
exports.UpdateFlashsellDto = UpdateFlashsellDto;
//# sourceMappingURL=update-flashsell.dto.js.map