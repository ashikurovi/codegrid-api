import { Controller, Get, Post, Body, Patch, Param, Delete, HttpStatus, HttpCode, UseInterceptors, UploadedFile, BadRequestException } from '@nestjs/common';
import { CacheInterceptor } from '@nestjs/cache-manager';
import { FileInterceptor } from '@nestjs/platform-express';
import { memoryStorage } from 'multer';
import { BrandsService } from './brands.service';
import { CreateBrandDto } from './dto/create-brand.dto';
import { UpdateBrandDto } from './dto/update-brand.dto';

const storageConfig = memoryStorage();

const fileFilterConfig = (req: any, file: Express.Multer.File, callback: any) => {
  if (!file.originalname.match(/\.(jpg|jpeg|png|gif|webp)$/)) {
    return callback(new BadRequestException('Only image files are allowed!'), false);
  }
  callback(null, true);
};

@Controller('brands')
export class BrandsController {
  private readonly IMGBB_API_KEY = '23426686fef26255161e09873534cdf6';

  constructor(private readonly brandsService: BrandsService) {}

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
    @Body() createBrandDto: CreateBrandDto,
    @UploadedFile() file?: Express.Multer.File,
  ) {
    if (file) {
      createBrandDto.picture = await this.uploadToImgbb(file);
    }
    const data = await this.brandsService.create(createBrandDto);
    return {
      statusCode: HttpStatus.CREATED,
      message: 'Brand created successfully',
      data,
    };
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  @UseInterceptors(CacheInterceptor)
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
  @UseInterceptors(CacheInterceptor)
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
  @UseInterceptors(FileInterceptor('picture', { storage: storageConfig, fileFilter: fileFilterConfig }))
  async update(
    @Param('id') id: string, 
    @Body() updateBrandDto: UpdateBrandDto,
    @UploadedFile() file?: Express.Multer.File,
  ) {
    if (file) {
      updateBrandDto.picture = await this.uploadToImgbb(file);
    }
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
