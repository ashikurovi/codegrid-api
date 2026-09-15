import { HttpStatus } from '@nestjs/common';
import { CampaignNoticeService } from './campaign-notice.service';
import { CreateCampaignNoticeDto } from './dto/create-campaign-notice.dto';
import { UpdateCampaignNoticeDto } from './dto/update-campaign-notice.dto';
export declare class CampaignNoticeController {
    private readonly campaignNoticeService;
    private readonly IMGBB_API_KEY;
    constructor(campaignNoticeService: CampaignNoticeService);
    private uploadToImgbb;
    create(createCampaignNoticeDto: CreateCampaignNoticeDto, file?: Express.Multer.File): Promise<{
        statusCode: HttpStatus;
        message: string;
        data: import("./entities/campaign-notice.entity").CampaignNotice;
    }>;
    findAll(): Promise<{
        statusCode: HttpStatus;
        message: string;
        data: import("./entities/campaign-notice.entity").CampaignNotice[];
    }>;
    findOne(id: string): Promise<{
        statusCode: HttpStatus;
        message: string;
        data: import("./entities/campaign-notice.entity").CampaignNotice;
    }>;
    update(id: string, updateCampaignNoticeDto: UpdateCampaignNoticeDto, file?: Express.Multer.File): Promise<{
        statusCode: HttpStatus;
        message: string;
        data: import("./entities/campaign-notice.entity").CampaignNotice;
    }>;
    remove(id: string): Promise<{
        statusCode: HttpStatus;
        message: string;
    }>;
}
