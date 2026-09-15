"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateCampaignNoticeDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_campaign_notice_dto_1 = require("./create-campaign-notice.dto");
class UpdateCampaignNoticeDto extends (0, mapped_types_1.PartialType)(create_campaign_notice_dto_1.CreateCampaignNoticeDto) {
}
exports.UpdateCampaignNoticeDto = UpdateCampaignNoticeDto;
//# sourceMappingURL=update-campaign-notice.dto.js.map