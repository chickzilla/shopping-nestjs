import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';
import { Observable } from 'rxjs';

// npm g gu auth ---> เหมือน middleware แต่อันนี้คอยปกป้องไม่ให้เข้า
// จริงๆ middleware คือ แปลง req
@Injectable()
export class AuthGuard implements CanActivate {
  // บอกว่า req จะผ่านได้เมื่ออะไร
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const req = context.switchToHttp().getRequest<Request>(); //--> เอา object ของ req
    // ถ้ามี req.uid --> ผ่าน middleware มาแล้ว ก็ให่ผ่านไปได้

    if (req.uid === undefined || req.uid === null) {
      throw new UnauthorizedException();
    }
    return req.uid !== undefined && req.uid !== null;
  }
}
