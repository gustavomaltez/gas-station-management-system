import { Employee } from '../entities';
import { BaseRepository } from './base';

export class EmployeeRepository extends BaseRepository {

  async create(employee: Employee): Promise<Employee> {
    const { email, cpf, password, address, name, salary, isAdminUser } = employee;
    const { street, number, postalCode } = address;

    const result = await this.database.query<{ id: string; }>(`
    INSERT INTO employee 
    (cpf, "name", email, "password", salary, address_street, address_number, address_postal_code, is_admin_user) 
    VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING id;`,
      [cpf, name, email, password, salary, street, number, postalCode, isAdminUser]
    );

    employee.id = result[0].id;
    return employee;
  }

  async emailOrCpfIsAlreadyInUse(email: string, cpf: string) {
    const employees = await this.database.query(`select * from employee where email = '${email}' or cpf = '${cpf}'`);
    return employees.length > 0;
  }
}