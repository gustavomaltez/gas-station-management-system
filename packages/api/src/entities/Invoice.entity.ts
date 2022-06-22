type PaymentMethod = 'money' | 'credit_card';

export class Invoice {
  id?: string;
  issuanceDate?: Date;
  value?: number;
  paymentMethod?: PaymentMethod;
  employeeId?: string;
  fuelId?: string;
  vehicleId?: string;
}