import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus } from '@nestjs/common';
import { CostingService } from './costing.service';
import { CreateCostingDto } from './dto/create-costing.dto';
import { UpdateCostingDto } from './dto/update-costing.dto';

@Controller('costing')
export class CostingController {
  constructor(private readonly costingService: CostingService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() dto: CreateCostingDto) {
    return this.costingService.create(dto);
  }

  @Get()
  async findAll() {
    return {
      statusCode: HttpStatus.OK,
      message: 'Costing records retrieved successfully',
      data: await this.costingService.findAll(),
    };
  }

  @Get('summary')
  async getSummary() {
    return {
      statusCode: HttpStatus.OK,
      message: 'Costing summary retrieved successfully',
      data: await this.costingService.getSummary(),
    };
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return {
      statusCode: HttpStatus.OK,
      message: 'Costing record retrieved successfully',
      data: await this.costingService.findOne(+id),
    };
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() dto: UpdateCostingDto) {
    return {
      statusCode: HttpStatus.OK,
      message: 'Costing record updated successfully',
      data: await this.costingService.update(+id, dto),
    };
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    await this.costingService.remove(+id);
    return {
      statusCode: HttpStatus.OK,
      message: 'Costing record deleted successfully',
    };
  }
}
