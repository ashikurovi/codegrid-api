export class CreateCostingDto {
  orderId?: number;
  productId?: number;
  unitCost: number;
  quantity?: number;
  totalCost?: number;
  notes?: string;
}
