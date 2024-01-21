import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserModule } from 'src/user/user.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  // เราใช้ userService เราจึงเอา UserModule มาใช้
  // เรา import ทั้งก้อน
  // register ตาม docs ( setting)
  imports: [
    UserModule,
    JwtModule.register({
      // เอาโค้ด secet ที่เก็บไว้มน .env
      secret: 'secret',
      signOptions: { expiresIn: '60' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService],
  // export ให้ไอ middleware มาใช้
  exports: [AuthService],
})
export class AuthModule {}
