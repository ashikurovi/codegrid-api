import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Order } from './order.entity';
import { Product } from '../../products/entities/product.entity';
import { Flashsell } from '../../flashsell/entities/flashsell.entity';
import { BudgetPick } from '../../budget-pick/entities/budget-pick.entity';

@Entity('order_items')
export class OrderItem {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Order, (order) => order.items, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'orderId' })
  order: Order;

  @ManyToOne(() => Product, { nullable: true })
  @JoinColumn({ name: 'productId' })
  product: Product;

  @ManyToOne(() => Flashsell, { nullable: true })
  @JoinColumn({ name: 'flashsellId' })
  flashsell: Flashsell;

  @ManyToOne(() => BudgetPick, { nullable: true })
  @JoinColumn({ name: 'budgetPickId' })
  budgetPick: BudgetPick;

  @Column()
  quantity: number;
}
