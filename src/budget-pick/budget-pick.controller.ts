import { Controller, Get, Post, Body, Patch, Param, Delete, HttpStatus, HttpCode, UseInterceptors, UploadedFile, BadRequestException } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { memoryStorage } from 'multer';
import { BudgetPickService } from './budget-pick.service';
import { CreateBudgetPickDto } from './dto/create-budget-pick.dto';
import { UpdateBudgetPickDto } from './dto/update-budget-pick.dto';

const storageConfig = memoryStorage();

const fileFilterConfig = (req: any, file: Express.Multer.File, callback: any) => {
  if (!file.originalname.match(/\.(jpg|jpeg|png|gif|webp)$/)) {
    return callback(new BadRequestException('Only image files are allowed!'), false);
  }
  callback(null, true);
};

@Controller('budget-pick')
export class BudgetPickController {
  private readonly IMGBB_API_KEY = '23426686fef26255161e09873534cdf6';

  constructor(private readonly budgetPickService: BudgetPickService) {}

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
    @Body() createBudgetPickDto: CreateBudgetPickDto,
    @UploadedFile() file?: Express.Multer.File,
  ) {
    if (file) {
      createBudgetPickDto.image = await this.uploadToImgbb(file);
    }
    const data = await this.budgetPickService.create(createBudgetPickDto);
    return data;
  }

  @Get()
    findAll() {
    return this.budgetPickService.findAll();
  }

  @Get(':id')
    findOne(@Param('id') id: string) {
    return this.budgetPickService.findOne(+id);
  }

  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  @UseInterceptors(FileInterceptor('image', { storage: storageConfig, fileFilter: fileFilterConfig }))
  async update(
    @Param('id') id: string, 
    @Body() updateBudgetPickDto: UpdateBudgetPickDto,
    @UploadedFile() file?: Express.Multer.File,
  ) {
    if (file) {
      updateBudgetPickDto.image = await this.uploadToImgbb(file);
    }
    const data = await this.budgetPickService.update(+id, updateBudgetPickDto);
    return data;
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.budgetPickService.remove(+id);
  }
}
