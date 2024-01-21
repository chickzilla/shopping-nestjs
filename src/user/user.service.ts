import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { hash } from 'bcryptjs';
import { User } from 'src/entities/user.entity';
import { json } from 'stream/consumers';
import { Repository } from 'typeorm';

// injectable --> userserver สามารถ inject(โยน) อะไรเข้ามาก็ได้
@Injectable()
export class UserService {
  // InjectRepository ก้อนที่ใช้ติดต่อ database โดยใช้ User
  // ถ้าจะเข้ามาก็ใช้ repo...
  //เสมือนตัวเชื่อกับ database
  constructor(
    @InjectRepository(User) private readonly repo: Repository<User>,
  ) {}

  // repo, findOne เป็น func จาก TypeOrm
  findById(id: number): Promise<User> {
    // .repo อาจใช้กรณีที่ find byอย่างอื่นที่ไม่ใช่ ID

    return this.repo.findOne({ where: { id } });
  }

  findByUsername(username: string): Promise<User | undefined> {
    console.log(username);
    return this.repo.findOne({ where: { username: username } });
  }

  // รับ object User ที่ไม่สนใจ id
  async create(dto: Omit<User, 'id'>): Promise<User> {
    // เอา username password แยกแล้วเอามาใส่ใน User
    const newUser = new User();
    const password = await hash(dto.password, 10);
    const user = { ...newUser, ...dto, password };
    return this.repo.save(user); // update table user ใหม่
  }

  async update(id: number, dto: Partial<Omit<User, 'id'>>): Promise<User> {
    const user = { ...(await this.findById(id)), ...dto }; // เอาของเก่าแล้วแก้อันใหม่ทับไป
    if (dto.password) {
      user.password = await hash(user.password, 10);
    }
    return this.repo.save(user);
  }

  async delete(id: number): Promise<User> {
    // await --> รอให้ find ID ก่อน
    const user = await this.findById(id);
    if (!user) return;
    await this.repo.remove(user);
    return user;
  }
}
