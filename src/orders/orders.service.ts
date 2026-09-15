import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Order, OrderStatus } from './entities/order.entity';
import { MailService } from '../mail/mail.service';
import { InventoryService } from '../inventory/inventory.service';
import { Product } from '../products/entities/product.entity';
import { UsersService } from '../users/users.service';
@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
    private readonly inventoryService: InventoryService,
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    private readonly mailService: MailService,
    private readonly usersService: UsersService,
  ) {}

  async create(createOrderDto: CreateOrderDto): Promise<Order> {
    const { items, userId, customerName, customerEmail, customerPhone, ...rest } = createOrderDto;
    const orderItems = items?.map((item) => ({
      product: { id: item.productId },
      quantity: item.quantity,
    }));

    let finalUserId = userId;

    if (!finalUserId && customerEmail && customerName) {
      let user = await this.usersService.findByEmail(customerEmail);
      if (!user) {
        user = await this.usersService.create({
          name: customerName,
          email: customerEmail,
          password: Math.random().toString(36).slice(-8), // temporary random password
          phone: customerPhone,
        });
      }
      finalUserId = user.id;
    }

    const order = this.orderRepository.create({
      ...rest,
      user: finalUserId ? { id: finalUserId } : undefined,
      items: orderItems,
    });
    return await this.orderRepository.save(order);
  }

  async findAll(): Promise<Order[]> {
    return await this.orderRepository.find({
      relations: {
        user: true,
        items: {
          product: true,
        },
      },
      select: {
        id: true,
        status: true,
        totalAmount: true,
        shippingAddress: true,
        paymentMethod: true,
        createdAt: true,
        updatedAt: true,
        user: { id: true, name: true, email: true },
        items: { id: true, quantity: true, product: { id: true, title: true, currentPrice: true, thumbnail: true } }
      },
      order: { createdAt: 'DESC' },
    });
  }

  async findAllByUser(userId: number): Promise<Order[]> {
    return await this.orderRepository.find({
      where: { user: { id: userId } },
      relations: {
        items: {
          product: true,
        },
      },
      select: {
        id: true,
        status: true,
        totalAmount: true,
        shippingAddress: true,
        paymentMethod: true,
        createdAt: true,
        updatedAt: true,
        items: { id: true, quantity: true, product: { id: true, title: true, currentPrice: true, thumbnail: true } }
      },
      order: { createdAt: 'DESC' },
    });
  }

  async trackOrder(identifier: string): Promise<Order> {
    // If identifier is purely numeric, it could be an ID
    // If it starts with + or contains non-digits, it might be a phone number
    // We will try to find by ID first, or by shippingAddress (which might contain the phone number) if we wanted to.
    // For simplicity, we assume identifier is the Order ID for now.
    // Support raw numeric ID or formatted ID like CG-0022
    let idToSearch: number | null = null;
    const cgMatch = identifier.match(/^CG-(\d+)$/i);
    if (cgMatch) {
      idToSearch = parseInt(cgMatch[1], 10);
    } else if (/^\d+$/.test(identifier)) {
      idToSearch = parseInt(identifier, 10);
    }

    let order: Order | null = null;
    
    if (idToSearch !== null) {
      order = await this.orderRepository.findOne({
        where: { id: idToSearch },
        relations: {
          items: {
            product: true
          },
          user: true
        },
        select: {
          id: true,
          status: true,
          totalAmount: true,
          shippingAddress: true,
          paymentMethod: true,
          createdAt: true,
          updatedAt: true,
          user: { id: true, name: true, email: true },
          items: { id: true, quantity: true, product: { id: true, title: true, currentPrice: true, thumbnail: true } }
        }
      });
    }

    if (!order) {
      throw new NotFoundException(`Order not found for tracking identifier #${identifier}`);
    }
    return order;
  }

  async findOne(id: number): Promise<Order> {
    const order = await this.orderRepository.findOne({
      where: { id },
      relations: {
        user: true,
        items: {
          product: true,
        },
      },
      select: {
        id: true,
        status: true,
        totalAmount: true,
        shippingAddress: true,
        paymentMethod: true,
        createdAt: true,
        updatedAt: true,
        user: { id: true, name: true, email: true },
        items: { id: true, quantity: true, product: { id: true, title: true, currentPrice: true, thumbnail: true } }
      }
    });
    if (!order) {
      throw new NotFoundException(`Order with ID ${id} not found`);
    }
    return order;
  }

  async update(id: number, updateOrderDto: UpdateOrderDto): Promise<Order> {
    const order = await this.findOne(id);
    const { items, userId, ...rest } = updateOrderDto as any;
    
    if (items) {
      order.items = items.map((item) => ({
        product: { id: item.productId },
        quantity: item.quantity,
      })) as any;
    }

    if (userId !== undefined) {
      order.user = { id: userId } as any;
    }
    
    Object.assign(order, rest);
    return await this.orderRepository.save(order);
  }

  async updateStatus(id: number, status: string): Promise<Order> {
    const order = await this.findOne(id);
    const oldStatus = order.status;
    
    order.status = status as any;
    const updatedOrder = await this.orderRepository.save(order);

    if (oldStatus !== status) {
      // Deduct stock if order is moving from PENDING to PROCESSING or SHIPPED
      const isConfirmed = status === OrderStatus.PROCESSING || status === OrderStatus.SHIPPED;
      const wasConfirmed = oldStatus === OrderStatus.PROCESSING || oldStatus === OrderStatus.SHIPPED;

      if (isConfirmed && !wasConfirmed) {
        for (const item of updatedOrder.items) {
          if (item.product?.id && item.product?.title) {
            await this.inventoryService.adjustStockByProduct(
              item.product.title,
              -item.quantity,
              `Order #${updatedOrder.id} confirmed`
            );
            
            const productEntity = await this.productRepository.findOne({ where: { id: item.product.id } });
            if (productEntity) {
              productEntity.stock = Math.max(0, (productEntity.stock || 0) - item.quantity);
              await this.productRepository.save(productEntity);
            }
          }
        }
      } else if (status === OrderStatus.REFUNDED) {
        for (const item of updatedOrder.items) {
          if (item.product?.id && item.product?.title) {
            await this.inventoryService.adjustStockByProduct(
              item.product.title,
              item.quantity,
              `Order #${updatedOrder.id} refunded`
            );

            const productEntity = await this.productRepository.findOne({ where: { id: item.product.id } });
            if (productEntity) {
              productEntity.stock = (productEntity.stock || 0) + item.quantity;
              await this.productRepository.save(productEntity);
            }
          }
        }
      }

      if (updatedOrder.user?.email) {
        await this.mailService.sendOrderStatusUpdateEmail(
          updatedOrder.user.email,
          updatedOrder.id,
          updatedOrder.status,
        );
      }
    }

    return updatedOrder;
  }

  async remove(id: number): Promise<void> {
    const order = await this.findOne(id);
    await this.orderRepository.remove(order);
  }
}
