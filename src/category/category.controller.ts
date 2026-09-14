import { Controller, Get, Post, Body, Patch, Param, Delete, HttpStatus, HttpCode, UseInterceptors, UploadedFile, BadRequestException } from '@nestjs/common';
import { CacheInterceptor } from '@nestjs/cache-manager';
import { FileInterceptor } from '@nestjs/platform-express';
import { memoryStorage } from 'multer';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

const storageConfig = memoryStorage();

const fileFilterConfig = (req: any, file: Express.Multer.File, callback: any) => {
  if (!file.originalname.match(/\.(jpg|jpeg|png|gif|webp)$/)) {
    return callback(new BadRequestException('Only image files are allowed!'), false);
  }
  callback(null, true);
};

@Controller('category')
export class CategoryController {
  private readonly IMGBB_API_KEY = '23426686fef26255161e09873534cdf6';

  constructor(private readonly categoryService: CategoryService) {}

  private async uploadToImgbb(file: Express.Multer.File): Promise<string> {
    const base64Image = file.buffer.toString('base64');
    const formData = new URLSearchParams();
    formData.append('image', base64Image);

    const response = await fetch(`https://api.imgbb.com/1/upload?key=${this.IMGBB_API_KEY}`, {
      method: 'POST',
      body: formData,
    });

    const data = await response.json();
    if (data.success) {
      return data.data.url;
    } else {
      throw new BadRequestException(data.error?.message || 'Failed to upload image to ImgBB');
    }
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @UseInterceptors(FileInterceptor('picture', { storage: storageConfig, fileFilter: fileFilterConfig }))
  async create(
    @Body() createCategoryDto: CreateCategoryDto,
    @UploadedFile() file?: Express.Multer.File,
  ) {
    if (file) {
      createCategoryDto.picture = await this.uploadToImgbb(file);
    }
    const data = await this.categoryService.create(createCategoryDto);
    return {
      statusCode: HttpStatus.CREATED,
      message: 'Category created successfully',
      data,
    };
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  @UseInterceptors(CacheInterceptor)
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
  @UseInterceptors(CacheInterceptor)
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
  @UseInterceptors(FileInterceptor('picture', { storage: storageConfig, fileFilter: fileFilterConfig }))
  async update(
    @Param('id') id: string, 
    @Body() updateCategoryDto: UpdateCategoryDto,
    @UploadedFile() file?: Express.Multer.File,
  ) {
    if (file) {
      updateCategoryDto.picture = await this.uploadToImgbb(file);
    }
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
