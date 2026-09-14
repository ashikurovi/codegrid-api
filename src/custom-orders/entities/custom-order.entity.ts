import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { CustomProduct } from '../../custom-products/entities/custom-product.entity';

export enum CustomOrderStatus {
  NEW_REQUEST = 'New Request',
  QUOTED = 'Quoted',
  IN_PRODUCTION = 'In Production',
  DELIVERED = 'Delivered',
}

@Entity('custom_orders')
export class CustomOrder {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => CustomProduct, { onDelete: 'SET NULL', nullable: true })
  @JoinColumn({ name: 'customProductId' })
  customProduct: CustomProduct;

  @ManyToOne(() => User, { onDelete: 'SET NULL', nullable: true })
  @JoinColumn({ name: 'userId' })
  user: User;

  @Column({ type: 'varchar', nullable: true })
  customerName: string;

  @Column({ type: 'varchar', nullable: true })
  customerPhone: string;

  @Column({ type: 'varchar', nullable: true })
  customerEmail: string;

  @Column()

  category: string;

  @Column()
  item: string;

  @Column({ default: 1 })
  quantity: number;

  @Column({ type: 'text', nullable: true })
  details: string;

  @Column({ type: 'varchar', nullable: true })
  designReference: string;

  @Column({
    type: 'enum',
    enum: CustomOrderStatus,
    default: CustomOrderStatus.NEW_REQUEST,
  })
  status: CustomOrderStatus;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  price: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
