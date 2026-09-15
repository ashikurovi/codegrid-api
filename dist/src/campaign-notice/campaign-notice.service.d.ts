import { Repository } from 'typeorm';
import { CreateCampaignNoticeDto } from './dto/create-campaign-notice.dto';
import { UpdateCampaignNoticeDto } from './dto/update-campaign-notice.dto';
import { CampaignNotice } from './entities/campaign-notice.entity';
export declare class CampaignNoticeService {
    private readonly campaignNoticeRepository;
    constructor(campaignNoticeRepository: Repository<CampaignNotice>);
    create(createCampaignNoticeDto: CreateCampaignNoticeDto): Promise<CampaignNotice>;
    findAll(): Promise<CampaignNotice[]>;
    findOne(id: number): Promise<CampaignNotice>;
    update(id: number, updateCampaignNoticeDto: UpdateCampaignNoticeDto): Promise<CampaignNotice>;
    remove(id: number): Promise<void>;
}
