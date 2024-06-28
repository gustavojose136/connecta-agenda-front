export class ScheduleFilter {
  id?: string;
  profissionalServiceId?: string;
  clientId?: string;
  status?: OrderStatusEnumModel | null;
  companyId?: string;
  startDate?: Date | null;
  endDate?: Date | null;
  paymentMethod: PaymentMethodEnum;
  planCardId?: string;
  isPaid: boolean;
  isPlanCoop: boolean;
}

export enum OrderStatusEnumModel {
  Scheduled = 1,
  InProgress = 2,
  Finished = 3,
  Canceled = 4,
  Rescheduled = 5
}

export enum PaymentMethodEnum {
  CreditCard = 1,
  DebitCard = 2,
  PlanCard = 3,
  Cash = 4
}
