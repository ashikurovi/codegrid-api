import { Repository } from 'typeorm';
import { CreateBannerDto } from './dto/create-banner.dto';
import { UpdateBannerDto } from './dto/update-banner.dto';
import { Banner } from './entities/banner.entity';
export declare class BannersService {
    private readonly bannerRepository;
    constructor(bannerRepository: Repository<Banner>);
    create(createBannerDto: CreateBannerDto): Promise<Banner>;
    findAll(): Promise<Banner[]>;
    findOne(id: number): Promise<Banner>;
    update(id: number, updateBannerDto: UpdateBannerDto): Promise<Banner>;
    remove(id: number): Promise<void>;
}
