import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

export enum CustomProductCategory {
  APPAREL = 'Apparel',
  BOTTLES = 'Bottles',
  CORPORATE = 'Corporate',
}

export enum CustomProductStatus {
  ACTIVE = 'Active',
  INACTIVE = 'Inactive',
}

@Entity('custom_products')
export class CustomProduct {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  productName: string;

  @Column({
    type: 'enum',
    enum: CustomProductCategory,
    default: CustomProductCategory.APPAREL,
  })
  category: CustomProductCategory;

  @Column()
  price: string;

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 60 })
  dtfPrintCost: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 150 })
  a4PrintCost: number;

  @Column({
    type: 'enum',
    enum: CustomProductStatus,
    default: CustomProductStatus.ACTIVE,
  })
  status: CustomProductStatus;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ nullable: true })
  discount: string;

  @Column({ nullable: true })
  image: string;

  @Column({ type: 'jsonb', nullable: true })
  packageItems: { name: string; imageUrl?: string }[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
