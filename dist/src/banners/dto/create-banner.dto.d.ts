import { BannerStatus } from '../entities/banner.entity';
export declare class CreateBannerDto {
    title: string;
    subtitle: string;
    tag?: string;
    link: string;
    image?: string;
    status?: BannerStatus;
    order?: number;
}
