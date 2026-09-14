import { Controller, Get, Post, Body, Patch, Param, Delete, HttpStatus, HttpCode } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(
    @Body() createCategoryDto: CreateCategoryDto,
  ) {
    const data = await this.categoryService.create(createCategoryDto);
    return {
      statusCode: HttpStatus.CREATED,
      message: 'Category created successfully',
      data,
    };
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  async findAll() {
    const data = await this.categoryService.findAll();
    return {
      statusCode: HttpStatus.OK,
      message: 'Categories retrieved successfully',
      data,
    };
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async findOne(@Param('id') id: string) {
    const data = await this.categoryService.findOne(+id);
    return {
      statusCode: HttpStatus.OK,
      message: 'Category retrieved successfully',
      data,
    };
  }

  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  async update(
    @Param('id') id: string, 
    @Body() updateCategoryDto: UpdateCategoryDto,
  ) {
    const data = await this.categoryService.update(+id, updateCategoryDto);
    return {
      statusCode: HttpStatus.OK,
      message: 'Category updated successfully',
      data,
    };
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  async remove(@Param('id') id: string) {
    await this.categoryService.remove(+id);
    return {
      statusCode: HttpStatus.OK,
      message: 'Category deleted successfully',
    };
  }
}
