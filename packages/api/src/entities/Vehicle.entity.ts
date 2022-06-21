
type Type = 'car' | 'motorcycle' | 'truck' | 'other';

export class Vehicle {
  registrationPlate: string;
  clientId: string;
  brand: string;
  type: Type;
}