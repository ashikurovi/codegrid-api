import { Controller, Get, Post, Body, Patch, Param, Delete, HttpStatus, HttpCode, UseInterceptors, UploadedFile, BadRequestException } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { memoryStorage } from 'multer';
import { CampaignNoticeService } from './campaign-notice.service';
import { CreateCampaignNoticeDto } from './dto/create-campaign-notice.dto';
import { UpdateCampaignNoticeDto } from './dto/update-campaign-notice.dto';

const storageConfig = memoryStorage();

const fileFilterConfig = (req: any, file: Express.Multer.File, callback: any) => {
  if (!file.originalname.match(/\.(jpg|jpeg|png|gif|webp)$/)) {
    return callback(new BadRequestException('Only image files are allowed!'), false);
  }
  callback(null, true);
};

@Controller('campaign-notice')
export class CampaignNoticeController {
  private readonly IMGBB_API_KEY = '23426686fef26255161e09873534cdf6';

  constructor(private readonly campaignNoticeService: CampaignNoticeService) {}

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
    @Body() createCampaignNoticeDto: CreateCampaignNoticeDto,
    @UploadedFile() file?: Express.Multer.File,
  ) {
    if (file) {
      createCampaignNoticeDto.image = await this.uploadToImgbb(file);
    }
    const data = await this.campaignNoticeService.create(createCampaignNoticeDto);
    return {
      statusCode: HttpStatus.CREATED,
      message: 'Campaign notice created successfully',
      data,
    };
  }

  @Get()
  @HttpCode(HttpStatus.OK)
    async findAll() {
    const data = await this.campaignNoticeService.findAll();
    return {
      statusCode: HttpStatus.OK,
      message: 'Campaign notices retrieved successfully',
      data,
    };
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
    async findOne(@Param('id') id: string) {
    const data = await this.campaignNoticeService.findOne(+id);
    return {
      statusCode: HttpStatus.OK,
      message: 'Campaign notice retrieved successfully',
      data,
    };
  }

  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  @UseInterceptors(FileInterceptor('image', { storage: storageConfig, fileFilter: fileFilterConfig }))
  async update(
    @Param('id') id: string, 
    @Body() updateCampaignNoticeDto: UpdateCampaignNoticeDto,
    @UploadedFile() file?: Express.Multer.File,
  ) {
    if (file) {
      updateCampaignNoticeDto.image = await this.uploadToImgbb(file);
    }
    const data = await this.campaignNoticeService.update(+id, updateCampaignNoticeDto);
    return {
      statusCode: HttpStatus.OK,
      message: 'Campaign notice updated successfully',
      data,
    };
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  async remove(@Param('id') id: string) {
    await this.campaignNoticeService.remove(+id);
    return {
      statusCode: HttpStatus.OK,
      message: 'Campaign notice deleted successfully',
    };
  }
}
