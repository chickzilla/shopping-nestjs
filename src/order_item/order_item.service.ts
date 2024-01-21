import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderItem } from 'src/entities/order-item.entity';

@Injectable()
export class OrderItemService {
  constructor(@InjectRepository(OrderItem) private readonly repo: OrderItem) {}
}
