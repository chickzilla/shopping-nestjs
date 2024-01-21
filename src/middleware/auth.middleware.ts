import { Injectable, NestMiddleware } from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { Request, Response } from 'express';

//nest g mi auth --> สร้าง middleware ชื่อ auth
// ---> authorization --> check role
// authentication --> login/register --> ส่ง token

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  // middleware ไม่ใช่ module เราจึง inject ได้เลยโดยไม่ได้ต้อง import module
  constructor(private readonly authService: AuthService) {}

  // ไม่ใช้ res --> _
  use(req: Request, _: Response, next: () => void) {
    // ถ้าไม่ส่งอะไรมาเลยให้เป็น ''
    const token = (req.headers.authorization ?? '').split('Bearer ')[1];
    console.log(token);
    try {
      const { uid } = this.authService.verifyToken(token);
      // อันนี้คือถ้ามี tpken ให้ใส่ uid แต่ถ้าไม่ม่ให้เป็น null เพื่อให้เอาไปให้ guard check อีกทีว่าจะให้เข้าไหม
      if (uid) {
        // ถ้ามีก็ไหลต่อไป
        req.uid = uid;
        console.log(uid);
      }
    } catch {
      req.uid = null;
    }
    next();
  }
}
