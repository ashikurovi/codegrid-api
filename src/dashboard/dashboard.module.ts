import { Module } from '@nestjs/common';
import { DashboardService } from './dashboard.service';
import { DashboardController } from './dashboard.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from '../orders/entities/order.entity';
import { CustomOrder } from '../custom-orders/entities/custom-order.entity';
import { User } from '../users/entities/user.entity';
import { Costing } from '../costing/entities/costing.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Order, CustomOrder, User, Costing])],
  controllers: [DashboardController],
  providers: [DashboardService],
})
export class DashboardModule {}
