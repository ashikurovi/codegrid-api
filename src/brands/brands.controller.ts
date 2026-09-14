import { Controller, Get, Post, Body, Patch, Param, Delete, HttpStatus, HttpCode } from '@nestjs/common';
import { BrandsService } from './brands.service';
import { CreateBrandDto } from './dto/create-brand.dto';
import { UpdateBrandDto } from './dto/update-brand.dto';

@Controller('brands')
export class BrandsController {
  constructor(private readonly brandsService: BrandsService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(
    @Body() createBrandDto: CreateBrandDto,
  ) {
    const data = await this.brandsService.create(createBrandDto);
    return {
      statusCode: HttpStatus.CREATED,
      message: 'Brand created successfully',
      data,
    };
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  async findAll() {
    const data = await this.brandsService.findAll();
    return {
      statusCode: HttpStatus.OK,
      message: 'Brands retrieved successfully',
      data,
    };
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async findOne(@Param('id') id: string) {
    const data = await this.brandsService.findOne(+id);
    return {
      statusCode: HttpStatus.OK,
      message: 'Brand retrieved successfully',
      data,
    };
  }

  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  async update(
    @Param('id') id: string, 
    @Body() updateBrandDto: UpdateBrandDto,
  ) {
    const data = await this.brandsService.update(+id, updateBrandDto);
    return {
      statusCode: HttpStatus.OK,
      message: 'Brand updated successfully',
      data,
    };
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  async remove(@Param('id') id: string) {
    await this.brandsService.remove(+id);
    return {
      statusCode: HttpStatus.OK,
      message: 'Brand deleted successfully',
    };
  }
}
