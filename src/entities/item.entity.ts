import { Column, Entity, PrimaryColumn } from 'typeorm';

// --> enum = การประกาศ constant
// --> จำกัดได้ว่าเอาค่าไรบ้าง
export enum Currency {
  BHT = 'BHT',
  USD = 'USD',
}

// nest g mo item ---> mo = module
// nest g co item
// nest g s item --> service

@Entity()
export class Item {
  @PrimaryColumn()
  id: number;

  @Column()
  name: string;

  @Column('float')
  price: number;

  @Column('enum', { enum: Currency })
  currency: Currency;
}
