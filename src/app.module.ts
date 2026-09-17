import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { CdnModule } from './cdn/cdn.module';
import { CategoryModule } from './category/category.module';
import { SubCategoryModule } from './sub-category/sub-category.module';
import { BrandsModule } from './brands/brands.module';
import { ProductsModule } from './products/products.module';
import { SizeModule } from './size/size.module';
import { TypesModule } from './types/types.module';
import { FlashsellModule } from './flashsell/flashsell.module';
import { BudgetPickModule } from './budget-pick/budget-pick.module';
import { CustomProductsModule } from './custom-products/custom-products.module';
import { OrdersModule } from './orders/orders.module';
import { CustomOrdersModule } from './custom-orders/custom-orders.module';
import { IncompleteOrdersModule } from './incomplete-orders/incomplete-orders.module';
import { BannersModule } from './banners/banners.module';
import { BlogsModule } from './blogs/blogs.module';
import { FeedbackModule } from './feedback/feedback.module';
import { InventoryModule } from './inventory/inventory.module';
import { CalculatorModule } from './calculator/calculator.module';
import { SettingsModule } from './settings/settings.module';
import { CampaignNoticeModule } from './campaign-notice/campaign-notice.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { AnalyticsModule } from './analytics/analytics.module';
import { CouponsModule } from './coupons/coupons.module';
import { CostingModule } from './costing/costing.module';

@Module({
  imports: [
        ConfigModule.forRoot({

      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        url: configService.get<string>('DATABASE_URL'),
        autoLoadEntities: true,
        synchronize: true,
        ssl: {
          rejectUnauthorized: false,
        },
      }),
      inject: [ConfigService],
    }),
    UsersModule,
    AuthModule,
    CdnModule,
    CategoryModule,
    SubCategoryModule,
    BrandsModule,
    ProductsModule,
    SizeModule,
    TypesModule,
    FlashsellModule,
    BudgetPickModule,
    CustomProductsModule,
    OrdersModule,
    CustomOrdersModule,
    IncompleteOrdersModule,
    BannersModule,
    BlogsModule,
    FeedbackModule,
    InventoryModule,
    CalculatorModule,
    SettingsModule,
    CampaignNoticeModule,
    DashboardModule,
    AnalyticsModule,
    CouponsModule,
    CostingModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
