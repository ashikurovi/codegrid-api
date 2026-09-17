import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Costing } from './entities/costing.entity';
import { CostingService } from './costing.service';
import { CostingController } from './costing.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Costing])],
  controllers: [CostingController],
  providers: [CostingService],
  exports: [CostingService],
})
export class CostingModule {}
