interface Address {
  street: string;
  postalCode: string;
  number: number;
}

interface BaseEmployeeData {
  cpf: string;
  name: string;
  email: string;
  password: string;
  salary: number;
  address: Address;
  isAdmin?: boolean;
}

export class Employee implements BaseEmployeeData {
  private _id: string | null;
  readonly cpf: string;
  readonly name: string;
  readonly email: string;
  readonly password: string;
  readonly salary: number;
  readonly address: Address;
  readonly isAdmin: boolean;

  constructor(data: BaseEmployeeData) {
    this.address = data.address;
    this.cpf = data.cpf;
    this.email = data.email;
    this.name = data.name;
    this.password = data.password;
    this.salary = data.salary;
    this.isAdmin = data.isAdmin ?? false;
    this._id = null;
  }

  get id(): string {
    if (!this._id) throw new Error('Unable to retrieve the employee id. The id was not been set.');
    return this._id;
  }

  set id(id: string) {
    this._id = id;
  }
}