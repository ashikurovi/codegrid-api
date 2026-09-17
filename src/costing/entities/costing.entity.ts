import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('costings')
export class Costing {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text', nullable: true })
  note?: string;

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  cost: number;

  @Column({ type: 'text', nullable: true })
  reason?: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
