"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const config_1 = require("@nestjs/config");
const typeorm_1 = require("@nestjs/typeorm");
const users_module_1 = require("./users/users.module");
const auth_module_1 = require("./auth/auth.module");
const cdn_module_1 = require("./cdn/cdn.module");
const category_module_1 = require("./category/category.module");
const sub_category_module_1 = require("./sub-category/sub-category.module");
const brands_module_1 = require("./brands/brands.module");
const products_module_1 = require("./products/products.module");
const size_module_1 = require("./size/size.module");
const types_module_1 = require("./types/types.module");
const flashsell_module_1 = require("./flashsell/flashsell.module");
const budget_pick_module_1 = require("./budget-pick/budget-pick.module");
const custom_products_module_1 = require("./custom-products/custom-products.module");
const orders_module_1 = require("./orders/orders.module");
const custom_orders_module_1 = require("./custom-orders/custom-orders.module");
const incomplete_orders_module_1 = require("./incomplete-orders/incomplete-orders.module");
const banners_module_1 = require("./banners/banners.module");
const blogs_module_1 = require("./blogs/blogs.module");
const feedback_module_1 = require("./feedback/feedback.module");
const inventory_module_1 = require("./inventory/inventory.module");
const calculator_module_1 = require("./calculator/calculator.module");
const settings_module_1 = require("./settings/settings.module");
const campaign_notice_module_1 = require("./campaign-notice/campaign-notice.module");
const dashboard_module_1 = require("./dashboard/dashboard.module");
const analytics_module_1 = require("./analytics/analytics.module");
const coupons_module_1 = require("./coupons/coupons.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
            }),
            typeorm_1.TypeOrmModule.forRootAsync({
                imports: [config_1.ConfigModule],
                useFactory: (configService) => ({
                    type: 'postgres',
                    url: configService.get('DATABASE_URL'),
                    autoLoadEntities: true,
                    synchronize: true,
                    ssl: {
                        rejectUnauthorized: false,
                    },
                }),
                inject: [config_1.ConfigService],
            }),
            users_module_1.UsersModule,
            auth_module_1.AuthModule,
            cdn_module_1.CdnModule,
            category_module_1.CategoryModule,
            sub_category_module_1.SubCategoryModule,
            brands_module_1.BrandsModule,
            products_module_1.ProductsModule,
            size_module_1.SizeModule,
            types_module_1.TypesModule,
            flashsell_module_1.FlashsellModule,
            budget_pick_module_1.BudgetPickModule,
            custom_products_module_1.CustomProductsModule,
            orders_module_1.OrdersModule,
            custom_orders_module_1.CustomOrdersModule,
            incomplete_orders_module_1.IncompleteOrdersModule,
            banners_module_1.BannersModule,
            blogs_module_1.BlogsModule,
            feedback_module_1.FeedbackModule,
            inventory_module_1.InventoryModule,
            calculator_module_1.CalculatorModule,
            settings_module_1.SettingsModule,
            campaign_notice_module_1.CampaignNoticeModule,
            dashboard_module_1.DashboardModule,
            analytics_module_1.AnalyticsModule,
            coupons_module_1.CouponsModule,
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map