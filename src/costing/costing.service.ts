import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Costing } from './entities/costing.entity';
import { CreateCostingDto } from './dto/create-costing.dto';
import { UpdateCostingDto } from './dto/update-costing.dto';

@Injectable()
export class CostingService {
  constructor(
    @InjectRepository(Costing)
    private readonly costingRepository: Repository<Costing>,
  ) {}

  async create(dto: CreateCostingDto) {
    const costing = this.costingRepository.create({
      note: dto.note ?? '',
      cost: Number(dto.cost || 0),
      reason: dto.reason ?? '',
    });

    return this.costingRepository.save(costing);
  }

  async findAll() {
    return this.costingRepository.find({
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: number) {
    const costing = await this.costingRepository.findOne({
      where: { id },
    });

    if (!costing) {
      throw new NotFoundException(`Cost record with ID ${id} not found`);
    }

    return costing;
  }

  async update(id: number, dto: UpdateCostingDto) {
    const costing = await this.findOne(id);
    const updated = this.costingRepository.merge(costing, {
      note: dto.note !== undefined ? dto.note : costing.note,
      cost: dto.cost !== undefined ? Number(dto.cost) : Number(costing.cost || 0),
      reason: dto.reason !== undefined ? dto.reason : costing.reason,
    });

    return this.costingRepository.save(updated);
  }

  async remove(id: number) {
    const costing = await this.findOne(id);
    await this.costingRepository.remove(costing);
  }

  async getSummary() {
    const records = await this.costingRepository.find();
    const totalCost = records.reduce((sum, item) => sum + Number(item.cost || 0), 0);

    return {
      totalCost,
      recordsCount: records.length,
      records,
    };
  }
}
