"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateCalculatorDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_calculator_dto_1 = require("./create-calculator.dto");
class UpdateCalculatorDto extends (0, mapped_types_1.PartialType)(create_calculator_dto_1.CreateCalculatorDto) {
}
exports.UpdateCalculatorDto = UpdateCalculatorDto;
//# sourceMappingURL=update-calculator.dto.js.map