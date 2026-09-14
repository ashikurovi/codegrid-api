import { Controller, Get, Post, Body, Patch, Param, Delete, HttpStatus, HttpCode, UseInterceptors, UploadedFile, BadRequestException } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { memoryStorage } from 'multer';
import { CustomOrdersService } from './custom-orders.service';
import { CreateCustomOrderDto } from './dto/create-custom-order.dto';
import { UpdateCustomOrderDto } from './dto/update-custom-order.dto';
import { UpdateCustomOrderStatusDto } from './dto/update-custom-order-status.dto';

const storageConfig = memoryStorage();

const fileFilterConfig = (req: any, file: Express.Multer.File, callback: any) => {
  if (!file.originalname.match(/\.(jpg|jpeg|png|gif|webp)$/)) {
    return callback(new BadRequestException('Only image files are allowed!'), false);
  }
  callback(null, true);
};

@Controller('custom-orders')
export class CustomOrdersController {
  private readonly IMGBB_API_KEY = '23426686fef26255161e09873534cdf6';

  constructor(private readonly customOrdersService: CustomOrdersService) {}

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
  @UseInterceptors(FileInterceptor('designReference', { storage: storageConfig, fileFilter: fileFilterConfig }))
  async create(
    @Body() createCustomOrderDto: CreateCustomOrderDto,
    @UploadedFile() file?: Express.Multer.File,
  ) {
    if (file) {
      createCustomOrderDto.designReference = await this.uploadToImgbb(file);
    }
    const data = await this.customOrdersService.create(createCustomOrderDto);
    return {
      statusCode: HttpStatus.CREATED,
      message: 'Custom order created successfully',
      data,
    };
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  async findAll() {
    const data = await this.customOrdersService.findAll();
    return {
      statusCode: HttpStatus.OK,
      message: 'Custom orders retrieved successfully',
      data,
    };
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async findOne(@Param('id') id: string) {
    const data = await this.customOrdersService.findOne(+id);
    return {
      statusCode: HttpStatus.OK,
      message: 'Custom order retrieved successfully',
      data,
    };
  }

  @Patch(':id/status')
  @HttpCode(HttpStatus.OK)
  async updateStatus(
    @Param('id') id: string,
    @Body() updateCustomOrderStatusDto: UpdateCustomOrderStatusDto,
  ) {
    const data = await this.customOrdersService.updateStatus(
      +id,
      updateCustomOrderStatusDto.status,
    );
    return {
      statusCode: HttpStatus.OK,
      message: 'Custom order status updated successfully',
      data,
    };
  }

  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  @UseInterceptors(FileInterceptor('designReference', { storage: storageConfig, fileFilter: fileFilterConfig }))
  async update(
    @Param('id') id: string, 
    @Body() updateCustomOrderDto: UpdateCustomOrderDto,
    @UploadedFile() file?: Express.Multer.File,
  ) {
    if (file) {
      updateCustomOrderDto.designReference = await this.uploadToImgbb(file);
    }
    const data = await this.customOrdersService.update(+id, updateCustomOrderDto);
    return {
      statusCode: HttpStatus.OK,
      message: 'Custom order updated successfully',
      data,
    };
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  async remove(@Param('id') id: string) {
    await this.customOrdersService.remove(+id);
    return {
      statusCode: HttpStatus.OK,
      message: 'Custom order deleted successfully',
    };
  }
}
