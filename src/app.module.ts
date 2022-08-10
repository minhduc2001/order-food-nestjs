import { Module } from '@nestjs/common';
import { FoodModule } from './food/food.module';
import { OrderModule } from './order/order.module';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import  JwtConfig from './config/jwt.config'

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '123456',
      database: 'food',
      entities: ['dist/**/*.{js, ts}'],
      synchronize: true,
    }),
    ConfigModule.forRoot({
      load: [JwtConfig],
    }),
    FoodModule,
    OrderModule,
    AuthModule,
  ],
})
export class AppModule {}
