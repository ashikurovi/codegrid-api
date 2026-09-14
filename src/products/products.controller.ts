import { Controller, Get, Post, Body, Patch, Param, Delete, HttpStatus, HttpCode, UseInterceptors, UploadedFiles, BadRequestException } from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { memoryStorage } from 'multer';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

const storageConfig = memoryStorage();

const fileFilterConfig = (req: any, file: Express.Multer.File, callback: any) => {
  if (!file.originalname.match(/\.(jpg|jpeg|png|gif|webp)$/)) {
    return callback(new BadRequestException('Only image files are allowed!'), false);
  }
  callback(null, true);
};

@Controller('products')
export class ProductsController {
  private readonly IMGBB_API_KEY = '23426686fef26255161e09873534cdf6';

  constructor(private readonly productsService: ProductsService) {}

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
  @UseInterceptors(FileFieldsInterceptor([
    { name: 'thumbnail', maxCount: 1 },
    { name: 'images', maxCount: 10 }
  ], { storage: storageConfig, fileFilter: fileFilterConfig }))
  async create(
    @Body() createProductDto: CreateProductDto,
    @UploadedFiles() files?: { thumbnail?: Express.Multer.File[], images?: Express.Multer.File[] },
  ) {
    if (files?.thumbnail?.[0]) {
      createProductDto.thumbnail = await this.uploadToImgbb(files.thumbnail[0]);
    }
    
    if (files?.images?.length) {
      const uploadedImageUrls = await Promise.all(
        files.images.map(file => this.uploadToImgbb(file))
      );
      // If there are already string images passed, append the newly uploaded ones. 
      // If none, just use the new ones.
      createProductDto.images = Array.isArray(createProductDto.images) 
        ? [...createProductDto.images, ...uploadedImageUrls] 
        : uploadedImageUrls;
    }

    const data = await this.productsService.create(createProductDto);
    return {
      statusCode: HttpStatus.CREATED,
      message: 'Product created successfully',
      data,
    };
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  async findAll() {
    const data = await this.productsService.findAll();
    return {
      statusCode: HttpStatus.OK,
      message: 'Products retrieved successfully',
      data,
    };
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async findOne(@Param('id') id: string) {
    const data = await this.productsService.findOne(+id);
    return {
      statusCode: HttpStatus.OK,
      message: 'Product retrieved successfully',
      data,
    };
  }

  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  @UseInterceptors(FileFieldsInterceptor([
    { name: 'thumbnail', maxCount: 1 },
    { name: 'images', maxCount: 10 }
  ], { storage: storageConfig, fileFilter: fileFilterConfig }))
  async update(
    @Param('id') id: string, 
    @Body() updateProductDto: UpdateProductDto,
    @UploadedFiles() files?: { thumbnail?: Express.Multer.File[], images?: Express.Multer.File[] },
  ) {
    if (files?.thumbnail?.[0]) {
      updateProductDto.thumbnail = await this.uploadToImgbb(files.thumbnail[0]);
    }

    if (files?.images?.length) {
      const uploadedImageUrls = await Promise.all(
        files.images.map(file => this.uploadToImgbb(file))
      );
      updateProductDto.images = Array.isArray(updateProductDto.images) 
        ? [...updateProductDto.images, ...uploadedImageUrls] 
        : uploadedImageUrls;
    }

    const data = await this.productsService.update(+id, updateProductDto);
    return {
      statusCode: HttpStatus.OK,
      message: 'Product updated successfully',
      data,
    };
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  async remove(@Param('id') id: string) {
    await this.productsService.remove(+id);
    return {
      statusCode: HttpStatus.OK,
      message: 'Product deleted successfully',
    };
  }
}
