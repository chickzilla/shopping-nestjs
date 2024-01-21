import { Injectable } from '@nestjs/common';

// เหมือนพวก controller พวก login

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }
}
