import { Employee } from '../entities';
import { BaseRepository } from './base';

export class EmployeeRepository extends BaseRepository {

  async create(employee: Employee): Promise<void> {
    const { email, cpf, password, address, name, salary, isAdminUser } = employee;
    const { street, number, postalCode } = address;
    await this.database.query(`
    INSERT INTO employee
      (cpf, name, email, password, salary, address_street, address_number, address_postal_code, is_admin_user)
      VALUES('${cpf}', '${name}', '${email}', '${password}', ${salary}, '${street}', ${number}, '${postalCode}', ${isAdminUser});
    `);
  }

  async hasEmployeeWithSameEmailOrCpf(email: string, cpf: string) {
    const employees = await this.database.query(`select * from employee where email = '${email}' or cpf = '${cpf}'`);
    console.log(employees);
    return employees.length > 0;
  }
}