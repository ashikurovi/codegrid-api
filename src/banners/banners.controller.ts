import { Controller, Get, UseInterceptors, Post, Body, Patch, Param, Delete, HttpStatus, HttpCode } from '@nestjs/common';
import { BannersService } from './banners.service';
import { CreateBannerDto } from './dto/create-banner.dto';
import { UpdateBannerDto } from './dto/update-banner.dto';

@Controller('banners')
export class BannersController {
  constructor(private readonly bannersService: BannersService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createBannerDto: CreateBannerDto) {
    const data = await this.bannersService.create(createBannerDto);
    return {
      statusCode: HttpStatus.CREATED,
      message: 'Banner created successfully',
      data,
    };
  }

  @Get()
  @HttpCode(HttpStatus.OK)
    async findAll() {
    const data = await this.bannersService.findAll();
    return {
      statusCode: HttpStatus.OK,
      message: 'Banners retrieved successfully',
      data,
    };
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
    async findOne(@Param('id') id: string) {
    const data = await this.bannersService.findOne(+id);
    return {
      statusCode: HttpStatus.OK,
      message: 'Banner retrieved successfully',
      data,
    };
  }

  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  async update(@Param('id') id: string, @Body() updateBannerDto: UpdateBannerDto) {
    const data = await this.bannersService.update(+id, updateBannerDto);
    return {
      statusCode: HttpStatus.OK,
      message: 'Banner updated successfully',
      data,
    };
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  async remove(@Param('id') id: string) {
    await this.bannersService.remove(+id);
    return {
      statusCode: HttpStatus.OK,
      message: 'Banner deleted successfully',
    };
  }
}
