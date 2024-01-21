import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { OrderService } from './order.service';
import { Order } from 'src/entities/order.entity';

@Controller('order')
export class OrderController {
  constructor(private readonly service: OrderService) {}

  @Get(':id')
  findById(@Param('id', new ParseIntPipe()) id: number) {
    return this.service.findById(id);
  }

  @Post()
  create(@Body() dto: Omit<Order, 'id'>) {
    return this.service.create(dto);
  }

  @Patch(':id')
  update(
    @Param('id', new ParseIntPipe()) id: number,
    @Body() dtp: Partial<Omit<Order, 'id'>>,
  ) {
    return this.service.update(id, dtp);
  }

  @Delete(':id')
  delete(@Param('id', new ParseIntPipe()) id: number) {
    return this.service.delete(id);
  }
}
