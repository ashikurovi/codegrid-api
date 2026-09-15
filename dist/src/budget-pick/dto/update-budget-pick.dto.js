"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateBudgetPickDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_budget_pick_dto_1 = require("./create-budget-pick.dto");
class UpdateBudgetPickDto extends (0, mapped_types_1.PartialType)(create_budget_pick_dto_1.CreateBudgetPickDto) {
}
exports.UpdateBudgetPickDto = UpdateBudgetPickDto;
//# sourceMappingURL=update-budget-pick.dto.js.map