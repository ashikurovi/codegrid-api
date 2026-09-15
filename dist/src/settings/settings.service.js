"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SettingsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const setting_entity_1 = require("./entities/setting.entity");
let SettingsService = class SettingsService {
    constructor(settingRepository) {
        this.settingRepository = settingRepository;
    }
    async create(createSettingDto) {
        const setting = this.settingRepository.create(createSettingDto);
        return await this.settingRepository.save(setting);
    }
    async findAll() {
        const settings = await this.settingRepository.find();
        if (settings.length === 0) {
            const defaultSetting = this.settingRepository.create({});
            const saved = await this.settingRepository.save(defaultSetting);
            return [saved];
        }
        return settings;
    }
    async findOne(id) {
        const setting = await this.settingRepository.findOne({ where: { id } });
        if (!setting) {
            throw new common_1.NotFoundException(`Setting #${id} not found`);
        }
        return setting;
    }
    async update(id, updateSettingDto) {
        const setting = await this.findOne(id);
        Object.assign(setting, updateSettingDto);
        return await this.settingRepository.save(setting);
    }
    async remove(id) {
        const setting = await this.findOne(id);
        await this.settingRepository.remove(setting);
    }
};
exports.SettingsService = SettingsService;
exports.SettingsService = SettingsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(setting_entity_1.Setting)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], SettingsService);
//# sourceMappingURL=settings.service.js.map