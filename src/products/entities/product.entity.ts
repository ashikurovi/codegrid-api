import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, ManyToMany, JoinTable, JoinColumn } from 'typeorm';
import { Category } from '../../category/entities/category.entity';
import { SubCategory } from '../../sub-category/entities/sub-category.entity';
import { Brand } from '../../brands/entities/brand.entity';
import { Size } from '../../size/entities/size.entity';
import { Type } from '../../types/entities/type.entity';

@Entity('products')
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({ nullable: true })
  sku: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  originalPrice: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  currentPrice: number;

  @Column({ type: 'int', default: 0 })
  stock: number;

  @Column({ nullable: true })
  variantLabel: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ type: 'text', nullable: true })
  additionalInfo: string;

  @Column({ type: 'simple-array', nullable: true })
  features: string[];

  @Column({ type: 'simple-array', nullable: true })
  images: string[];

  @Column({ nullable: true })
  thumbnail: string;

  @ManyToMany(() => Size)
  @JoinTable({ name: 'product_sizes' })
  sizes: Size[];

  @ManyToMany(() => Type)
  @JoinTable({ name: 'product_types' })
  types: Type[];

  @ManyToOne(() => Category, { onDelete: 'SET NULL', nullable: true })
  @JoinColumn({ name: 'categoryId' })
  category: Category;

  @ManyToOne(() => SubCategory, { onDelete: 'SET NULL', nullable: true })
  @JoinColumn({ name: 'subCategoryId' })
  subCategory: SubCategory;

  @ManyToOne(() => Brand, { onDelete: 'SET NULL', nullable: true })
  @JoinColumn({ name: 'brandId' })
  brand: Brand;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
