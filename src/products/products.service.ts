import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  async create(createProductDto: CreateProductDto): Promise<Product> {
    const { categoryId, subCategoryId, brandId, sizeIds, typeIds, ...rest } = createProductDto;
    
    const product = this.productRepository.create({
      ...rest,
      category: categoryId ? { id: categoryId } : undefined,
      subCategory: subCategoryId ? { id: subCategoryId } : undefined,
      brand: brandId ? { id: brandId } : undefined,
      sizes: sizeIds?.length ? sizeIds.map(id => ({ id })) : undefined,
      types: typeIds?.length ? typeIds.map(id => ({ id })) : undefined,
    });
    
    return await this.productRepository.save(product);
  }

  async findAll(): Promise<Product[]> {
    return await this.productRepository.find({
      relations: {
        category: true,
        subCategory: true,
        brand: true,
        sizes: true,
        types: true,
      },
      select: {
        id: true,
        sku: true,
        title: true,
        originalPrice: true,
        currentPrice: true,
        stock: true,
        thumbnail: true,
        images: true,
        category: { id: true, name: true },
        subCategory: { id: true, name: true },
        brand: { id: true, name: true },
        sizes: { id: true, name: true },
        types: { id: true, name: true }
      }
    });
  }

  async findOne(identifier: string | number): Promise<Product> {
    const isNum = !isNaN(Number(identifier)) && /^\d+$/.test(String(identifier).trim());
    let product: Product | null = null;

    if (isNum) {
      product = await this.productRepository.findOne({
        where: { id: Number(identifier) },
        relations: {
          category: true,
          subCategory: true,
          brand: true,
          sizes: true,
          types: true,
        },
        select: {
          id: true,
          sku: true,
          title: true,
          originalPrice: true,
          currentPrice: true,
          stock: true,
          variantLabel: true,
          description: true,
          additionalInfo: true,
          features: true,
          thumbnail: true,
          images: true,
          category: { id: true, name: true },
          subCategory: { id: true, name: true },
          brand: { id: true, name: true },
          sizes: { id: true, name: true },
          types: { id: true, name: true }
        }
      });
    }

    if (!product) {
      const term = String(identifier).trim().toLowerCase();
      const allProducts = await this.findAll();
      const match = allProducts.find((p) => {
        const pSku = (p.sku || `CG-${p.id}`).toLowerCase();
        const pSlug = (p.title || '').toLowerCase().replace(/[^a-z0-9]+/g, '-');
        return (
          pSku === term ||
          pSlug === term ||
          String(p.id) === term
        );
      });

      if (match) {
        return this.findOne(match.id);
      }
    }

    if (!product) {
      throw new NotFoundException(`Product with ID/SKU '${identifier}' not found`);
    }
    return product;
  }

  async update(id: number, updateProductDto: UpdateProductDto): Promise<Product> {
    const product = await this.findOne(id);
    const { categoryId, subCategoryId, brandId, sizeIds, typeIds, ...rest } = updateProductDto;

    const updatedData: any = { ...rest };
    if (categoryId !== undefined) {
      updatedData.category = categoryId ? { id: categoryId } : null;
    }
    if (subCategoryId !== undefined) {
      updatedData.subCategory = subCategoryId ? { id: subCategoryId } : null;
    }
    if (brandId !== undefined) {
      updatedData.brand = brandId ? { id: brandId } : null;
    }
    if (sizeIds !== undefined) {
      updatedData.sizes = sizeIds?.length ? sizeIds.map(id => ({ id })) : [];
    }
    if (typeIds !== undefined) {
      updatedData.types = typeIds?.length ? typeIds.map(id => ({ id })) : [];
    }

    const updatedProduct = this.productRepository.merge(product, updatedData);
    return await this.productRepository.save(updatedProduct);
  }

  async remove(id: number): Promise<void> {
    const product = await this.findOne(id);
    await this.productRepository.remove(product);
  }
}
