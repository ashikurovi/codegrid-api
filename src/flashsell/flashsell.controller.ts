import { Controller, Get, Post, Body, Patch, Param, Delete, HttpStatus, HttpCode, UseInterceptors, UploadedFile, BadRequestException } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { memoryStorage } from 'multer';
import { FlashsellService } from './flashsell.service';
import { CreateFlashsellDto } from './dto/create-flashsell.dto';
import { UpdateFlashsellDto } from './dto/update-flashsell.dto';

const storageConfig = memoryStorage();

const fileFilterConfig = (req: any, file: Express.Multer.File, callback: any) => {
  if (!file.originalname.match(/\.(jpg|jpeg|png|gif|webp)$/)) {
    return callback(new BadRequestException('Only image files are allowed!'), false);
  }
  callback(null, true);
};

@Controller('flashsell')
export class FlashsellController {
  private readonly IMGBB_API_KEY = '23426686fef26255161e09873534cdf6';

  constructor(private readonly flashsellService: FlashsellService) {}

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
  @UseInterceptors(FileInterceptor('image', { storage: storageConfig, fileFilter: fileFilterConfig }))
  async create(
    @Body() createFlashsellDto: CreateFlashsellDto,
    @UploadedFile() file?: Express.Multer.File,
  ) {
    if (file) {
      createFlashsellDto.image = await this.uploadToImgbb(file);
    }
    const data = await this.flashsellService.create(createFlashsellDto);
    return {
      statusCode: HttpStatus.CREATED,
      message: 'Flashsell created successfully',
      data,
    };
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  async findAll() {
    const data = await this.flashsellService.findAll();
    return {
      statusCode: HttpStatus.OK,
      message: 'Flashsells retrieved successfully',
      data,
    };
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async findOne(@Param('id') id: string) {
    const data = await this.flashsellService.findOne(+id);
    return {
      statusCode: HttpStatus.OK,
      message: 'Flashsell retrieved successfully',
      data,
    };
  }

  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  @UseInterceptors(FileInterceptor('image', { storage: storageConfig, fileFilter: fileFilterConfig }))
  async update(
    @Param('id') id: string, 
    @Body() updateFlashsellDto: UpdateFlashsellDto,
    @UploadedFile() file?: Express.Multer.File,
  ) {
    if (file) {
      updateFlashsellDto.image = await this.uploadToImgbb(file);
    }
    const data = await this.flashsellService.update(+id, updateFlashsellDto);
    return {
      statusCode: HttpStatus.OK,
      message: 'Flashsell updated successfully',
      data,
    };
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  async remove(@Param('id') id: string) {
    await this.flashsellService.remove(+id);
    return {
      statusCode: HttpStatus.OK,
      message: 'Flashsell deleted successfully',
    };
  }
}
