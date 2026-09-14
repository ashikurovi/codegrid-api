import { Controller, Get, Post, Body, Patch, Param, Delete, HttpStatus, HttpCode } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(
    @Body() createUserDto: CreateUserDto,
  ) {
    const data = await this.usersService.create(createUserDto);
    return {
      statusCode: HttpStatus.CREATED,
      message: 'User created successfully',
      data,
    };
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  async findAll() {
    const data = await this.usersService.findAll();
    return {
      statusCode: HttpStatus.OK,
      message: 'Users retrieved successfully',
      data,
    };
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async findOne(@Param('id') id: string) {
    const data = await this.usersService.findOne(+id);
    return {
      statusCode: HttpStatus.OK,
      message: 'User retrieved successfully',
      data,
    };
  }

  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  async update(
    @Param('id') id: string, 
    @Body() updateUserDto: UpdateUserDto,
  ) {
    const data = await this.usersService.update(+id, updateUserDto);
    return {
      statusCode: HttpStatus.OK,
      message: 'User updated successfully',
      data,
    };
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  async remove(@Param('id') id: string) {
    await this.usersService.remove(+id);
    return {
      statusCode: HttpStatus.OK,
      message: 'User deleted successfully',
    };
  }

  @Patch(':id/ban')
  @HttpCode(HttpStatus.OK)
  async banUser(@Param('id') id: string, @Body('isBanned') isBanned: boolean) {
    const data = await this.usersService.banUser(+id, isBanned);
    return {
      statusCode: HttpStatus.OK,
      message: isBanned ? 'User banned successfully' : 'User unbanned successfully',
      data,
    };
  }
}
