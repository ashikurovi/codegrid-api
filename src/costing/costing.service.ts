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
    const totalCost = Number(dto.totalCost ?? (Number(dto.unitCost || 0) * Number(dto.quantity || 1)));

    const costing = this.costingRepository.create({
      ...dto,
      quantity: Number(dto.quantity || 1),
      unitCost: Number(dto.unitCost || 0),
      totalCost,
      orderId: dto.orderId ?? undefined,
      productId: dto.productId ?? undefined,
    });

    return this.costingRepository.save(costing);
  }

  async findAll() {
    return this.costingRepository.find({
      relations: { product: true, order: true },
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: number) {
    const costing = await this.costingRepository.findOne({
      where: { id },
      relations: { product: true, order: true },
    });

    if (!costing) {
      throw new NotFoundException(`Cost record with ID ${id} not found`);
    }

    return costing;
  }

  async update(id: number, dto: UpdateCostingDto) {
    const costing = await this.findOne(id);
    const updated = this.costingRepository.merge(costing, {
      ...dto,
      quantity: dto.quantity !== undefined ? Number(dto.quantity) : costing.quantity,
      unitCost: dto.unitCost !== undefined ? Number(dto.unitCost) : costing.unitCost,
      totalCost: dto.totalCost !== undefined ? Number(dto.totalCost) : Number(costing.totalCost || 0),
    });

    return this.costingRepository.save(updated);
  }

  async remove(id: number) {
    const costing = await this.findOne(id);
    await this.costingRepository.remove(costing);
  }

  async getSummary() {
    const records = await this.costingRepository.find();
    const totalCost = records.reduce((sum, item) => sum + Number(item.totalCost || 0), 0);

    return {
      totalCost,
      recordsCount: records.length,
      records,
    };
  }
}
