interface Address {
  street: string;
  postalCode: string;
  number: number;
}

interface Phones {
  main: string;
  secondary: string;
}

export class Client {
  cpf?: string;
  name?: string;
  address?: Address;
  birthDate?: Date;
  phones?: Phones;
}