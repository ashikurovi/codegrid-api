import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { Order } from './entities/order.entity';
import { OrderItem } from './entities/order-item.entity';
import { MailModule } from '../mail/mail.module';
import { InventoryModule } from '../inventory/inventory.module';
import { Product } from '../products/entities/product.entity';
import { UsersModule } from '../users/users.module';
import { Coupon } from '../coupons/entities/coupon.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Order, OrderItem, Product, Coupon]), MailModule, InventoryModule, UsersModule],
  controllers: [OrdersController],
  providers: [OrdersService],
  exports: [OrdersService],
})
export class OrdersModule {}
