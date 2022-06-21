interface Address {
  street: string;
  postalCode: string;
  number: number;
}

export class Employee {
  id: string;
  cpf: string;
  name: string;
  email: string;
  password: string;
  salary: number;
  address: Address;
  isAdminUser: boolean;
}