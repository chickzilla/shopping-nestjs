// เอา table มาเขียน entites ทั้งหมด

//การเขียน typeORM
// nest g module user --> ใน app.module ก็จะมี userModule มาให้ + มี folder User
// nest g controller user --> สร้าง user.controller
// nest g service user

import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { OrderItem } from './order-item.entity';
import { Order } from './order.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn() // Primary keys
  id: number;

  @Column({ default: 'userDefault' }) // แต่ละ column
  username: string;

  @Column({ default: 'passwordDefault' })
  password: string;

  // Relation one to many

  @OneToMany(() => Order, (order) => order.user)
  orders: Order[];
}
