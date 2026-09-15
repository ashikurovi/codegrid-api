import { HttpStatus } from '@nestjs/common';
import { BannersService } from './banners.service';
import { CreateBannerDto } from './dto/create-banner.dto';
import { UpdateBannerDto } from './dto/update-banner.dto';
export declare class BannersController {
    private readonly bannersService;
    constructor(bannersService: BannersService);
    create(createBannerDto: CreateBannerDto): Promise<{
        statusCode: HttpStatus;
        message: string;
        data: import("./entities/banner.entity").Banner;
    }>;
    findAll(): Promise<{
        statusCode: HttpStatus;
        message: string;
        data: import("./entities/banner.entity").Banner[];
    }>;
    findOne(id: string): Promise<{
        statusCode: HttpStatus;
        message: string;
        data: import("./entities/banner.entity").Banner;
    }>;
    update(id: string, updateBannerDto: UpdateBannerDto): Promise<{
        statusCode: HttpStatus;
        message: string;
        data: import("./entities/banner.entity").Banner;
    }>;
    remove(id: string): Promise<{
        statusCode: HttpStatus;
        message: string;
    }>;
}
