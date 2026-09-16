import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany, ManyToOne, JoinColumn } from 'typeorm';
import { OrderItem } from './order-item.entity';
import { User } from '../../users/entities/user.entity';

export enum OrderStatus {
  PENDING = 'Pending',
  PROCESSING = 'Processing',
  SHIPPED = 'Shipped',
  DELIVERED = 'Delivered',
  REFUNDED = 'Refunded',
}

export enum PaymentMethod {
  COD = 'COD',
  BKASH = 'Bkash',
}

export enum DeliveryType {
  INSIDE_DHAKA = 'INSIDE_DHAKA',
  OUTSIDE_DHAKA = 'OUTSIDE_DHAKA',
  DHAKA_SUBURBS = 'DHAKA_SUBURBS',
}

@Entity('orders')
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, { onDelete: 'SET NULL', nullable: true })
  @JoinColumn({ name: 'userId' })
  user: User;

  @OneToMany(() => OrderItem, (orderItem) => orderItem.order, { cascade: true })
  items: OrderItem[];

  @Column({ type: 'text' })
  shippingAddress: string;

  @Column({
    type: 'enum',
    enum: OrderStatus,
    default: OrderStatus.PENDING,
  })
  status: OrderStatus;

  @Column({
    type: 'enum',
    enum: PaymentMethod,
    default: PaymentMethod.COD,
  })
  paymentMethod: PaymentMethod;

  @Column({
    type: 'enum',
    enum: DeliveryType,
    default: DeliveryType.INSIDE_DHAKA,
  })
  deliveryType: DeliveryType;

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 65 })
  deliveryFee: number;

  @Column({ type: 'text', nullable: true })
  orderNotes: string;

  @Column({ type: 'varchar', nullable: true })
  deviceId: string;

  @Column({ type: 'text', nullable: true })
  device: string;

  @Column({ type: 'varchar', nullable: true })
  location: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  totalAmount: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
