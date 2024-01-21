import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from 'src/entities/order.entity';
import { Repository } from 'typeorm';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order) private readonly repo: Repository<Order>,
  ) {}

  findById(id: number): Promise<Order> {
    return this.repo.findOne({ where: { id } });
  }

  create(dto: Omit<Order, 'id'>): Promise<Order> {
    const order = { ...new Order(), ...dto };
    return this.repo.save(order);
  }

  async update(id: number, dto: Partial<Omit<Order, 'id'>>): Promise<Order> {
    const Order = { ...(await this.findById(id)), ...dto };
    return this.repo.save(Order);
  }

  async delete(id: number): Promise<Order> {
    const Order = await this.findById(id);
    if (!Order) return;
    await this.repo.delete(Order);
    return Order;
  }
}
