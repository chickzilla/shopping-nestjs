import { MiddlewareConsumer, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { join } from 'path';
import { ItemModule } from './item/item.module';
import { OrderModule } from './order/order.module';
import { OrderItemModule } from './order_item/order_item.module';
import { AuthModule } from './auth/auth.module';
import { AuthMiddleware } from './middleware/auth.middleware';

// module เห็น controller / service
@Module({
  // TypeORM ตัวจัดการ database แบบพวก sql ถ้าเป็น mongo ก็ใช้อีกแบบ
  imports: [
    TypeOrmModule.forRoot({
      // config database ที่เราสร้างใน docker
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'user',
      password: 'password',
      database: 'shoper',
      //ใน typeORM จะเรียก table ว่า entities

      // เอาfileที่มีคำว่า entity จากที่ไหนก็ได้ใน root มาเป็น entities
      entities: [join(__dirname, '**/*.entity.{ts,js}')],
      // migrate schema ตอนที่ข้อมูลใน relation database เปลี่ยน
      synchronize: true,
    }),
    UserModule,
    ItemModule,
    OrderModule,
    OrderItemModule,
    AuthModule,
  ],
  // controller เรียกใช้ logic
  controllers: [AppController],
  // มอง providers เป็นพวก logic
  providers: [AppService],
})
export class AppModule {
  //  บอกว่าจะใช้ middleware กับทุก routes
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes('*');
  }
}
