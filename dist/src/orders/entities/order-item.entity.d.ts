import { Order } from './order.entity';
import { Product } from '../../products/entities/product.entity';
import { Flashsell } from '../../flashsell/entities/flashsell.entity';
import { BudgetPick } from '../../budget-pick/entities/budget-pick.entity';
export declare class OrderItem {
    id: number;
    order: Order;
    product: Product;
    flashsell: Flashsell;
    budgetPick: BudgetPick;
    quantity: number;
}
