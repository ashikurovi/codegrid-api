import { Controller, Get, Post, Body, Patch, Param, Delete, HttpStatus, HttpCode } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { UpdateOrderStatusDto } from './dto/update-order-status.dto';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createOrderDto: CreateOrderDto) {
    const data = await this.ordersService.create(createOrderDto);
    return {
      statusCode: HttpStatus.CREATED,
      message: 'Order created successfully',
      data,
    };
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  async findAll() {
    const data = await this.ordersService.findAll();
    return {
      statusCode: HttpStatus.OK,
      message: 'Orders retrieved successfully',
      data,
    };
  }

  @Get('user/:userId')
  @HttpCode(HttpStatus.OK)
  async findAllByUser(@Param('userId') userId: string) {
    const data = await this.ordersService.findAllByUser(+userId);
    return {
      statusCode: HttpStatus.OK,
      message: 'User orders retrieved successfully',
      data,
    };
  }

  @Get('track/:identifier')
  @HttpCode(HttpStatus.OK)
  async trackOrder(@Param('identifier') identifier: string) {
    const data = await this.ordersService.trackOrder(identifier);
    return {
      statusCode: HttpStatus.OK,
      message: 'Order tracking info retrieved successfully',
      data,
    };
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async findOne(@Param('id') id: string) {
    const data = await this.ordersService.findOne(+id);
    return {
      statusCode: HttpStatus.OK,
      message: 'Order retrieved successfully',
      data,
    };
  }

  @Post('pre-order')
  @HttpCode(HttpStatus.CREATED)
  async createPreOrder(@Body() createOrderDto: CreateOrderDto) {
    const data = await this.ordersService.createPreOrder(createOrderDto);
    return {
      statusCode: HttpStatus.CREATED,
      message: 'Pre-order created successfully',
      data,
    };
  }

  @Patch(':id/convert-pre-order')
  @HttpCode(HttpStatus.OK)
  async convertPreOrder(@Param('id') id: string) {
    const data = await this.ordersService.convertPreOrder(+id);
    return {
      statusCode: HttpStatus.OK,
      message: 'Pre-order converted to confirmed order successfully',
      data,
    };
  }

  @Patch(':id/status')
  @HttpCode(HttpStatus.OK)
  async updateStatus(@Param('id') id: string, @Body() updateOrderStatusDto: UpdateOrderStatusDto) {
    const data = await this.ordersService.updateStatus(+id, updateOrderStatusDto.status);
    return {
      statusCode: HttpStatus.OK,
      message: 'Order status updated successfully',
      data,
    };
  }

  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  async update(@Param('id') id: string, @Body() updateOrderDto: UpdateOrderDto) {
    const data = await this.ordersService.update(+id, updateOrderDto);
    return {
      statusCode: HttpStatus.OK,
      message: 'Order updated successfully',
      data,
    };
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  async remove(@Param('id') id: string) {
    await this.ordersService.remove(+id);
    return {
      statusCode: HttpStatus.OK,
      message: 'Order deleted successfully',
    };
  }
}
