import { MailerModule } from '@nestjs-modules/mailer';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './modules/auth/auth.module';
import { CategoriesModule } from './modules/categories/categories.module';
import { FlashSalesModule } from './modules/flash-sales/flash-sales.module';
import { ProductsModule } from './modules/products/products.module';
import { UsersModule } from './modules/users/users.module';
import { VouchersModule } from './modules/vouchers/vouchers.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRootAsync({
      useFactory: () => ({
        uri: process.env.MONGO_URI,
        useNewUrlParser: true,
      }),
    }),
    MailerModule.forRootAsync({
      useFactory: () => ({
        transport: {
          host: process.env.MAIL_SERVICE,
          port: 587,
          secure: false,
          auth: {
            user: process.env.MAIL_USER,
            pass: process.env.MAIL_PASSWORD,
          },
          defaults: {
            from: `"No Reply" <${process.env.MAIL_USERNAME}>`,
          },
        },
      }),
    }),
    UsersModule,
    AuthModule,
    CategoriesModule,
    VouchersModule,
    FlashSalesModule,
    ProductsModule,
  ],

  controllers: [],
  providers: [],
})
export class AppModule {}
