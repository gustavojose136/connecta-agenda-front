import { OrderStatusEnumModel, PaymentMethodEnum } from "../filter/scheduleFilter.model";

export class OrderAddModel {
  profissionalServiceId: string;
  clientId: string;
  observation: string;
  status: OrderStatusEnumModel;
  startDate: Date;
  endDate?: Date | null;
  paymentMethod: PaymentMethodEnum;
  planCardId?: string;
  price: number;
  discont: number;
  isPaid: boolean;
  isPlanCoop: boolean;
  pricePlanCoop?: number | null;
}
