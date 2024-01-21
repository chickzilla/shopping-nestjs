import {
  BadRequestException,
  Body,
  Injectable,
  Post,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcryptjs';
import { User } from 'src/entities/user.entity';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  // เราใช้ตัว User Service เข้ามาช่วย ( หาพวก user) เราก็ inject เข้ามา
  // เอา libary มสใช้ = เอา module มาใช้
  constructor(
    private readonly userService: UserService,
    private readonly jwyService: JwtService,
  ) {}

  async login({ username, password }: Omit<User, 'id'>) {
    // เราใช้ Userservice ที่เราพึ่ง inject เข้ามา
    const user = await this.userService.findByUsername(username);
    if (!user) {
      throw new UnauthorizedException('User not found'); //--> nestjs จะส่ง error status
    }

    const isValid = await compare(password, user.password);
    if (!isValid) {
      throw new BadRequestException('User not found');
    }

    return this.jwyService.sign({ uid: user.id });
  }

  // ใช้สำหรับ export ให้ตัว middleware ใช้
  verifyToken(token: string): { uid: number } {
    return this.jwyService.verify(token);
  }
}
