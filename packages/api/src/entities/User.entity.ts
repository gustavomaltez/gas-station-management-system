import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

export enum UserRole {
  admin = 'admin',
  employee = 'employee',
}

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column({ type: 'varchar', length: 100 })
  name: string;

  @Column({ type: 'varchar', length: 100 })
  password: string;

  @Column({ type: 'varchar', length: 100, unique: true })
  email: string;

  @Column({ type: 'varchar', length: 25, default: UserRole.employee })
  role: UserRole;
}