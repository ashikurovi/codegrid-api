import { SettingsService } from './settings.service';
import { CreateSettingDto } from './dto/create-setting.dto';
import { UpdateSettingDto } from './dto/update-setting.dto';
export declare class SettingsController {
    private readonly settingsService;
    constructor(settingsService: SettingsService);
    create(createSettingDto: CreateSettingDto): Promise<import("./entities/setting.entity").Setting>;
    findAll(): Promise<import("./entities/setting.entity").Setting[]>;
    findOne(id: string): Promise<import("./entities/setting.entity").Setting>;
    update(id: string, updateSettingDto: UpdateSettingDto): Promise<import("./entities/setting.entity").Setting>;
    remove(id: string): Promise<void>;
}
