import { Repository } from 'typeorm';
import { CreateSettingDto } from './dto/create-setting.dto';
import { UpdateSettingDto } from './dto/update-setting.dto';
import { Setting } from './entities/setting.entity';
export declare class SettingsService {
    private readonly settingRepository;
    constructor(settingRepository: Repository<Setting>);
    create(createSettingDto: CreateSettingDto): Promise<Setting>;
    findAll(): Promise<Setting[]>;
    findOne(id: number): Promise<Setting>;
    update(id: number, updateSettingDto: UpdateSettingDto): Promise<Setting>;
    remove(id: number): Promise<void>;
}
