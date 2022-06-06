import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: number;
  
  @Column({ type: 'varchar', length: 14, unique: true })
  cpf: string;
  
  @Column({ type: 'varchar', length: 100 })
  name: string;

  @Column({ type: 'varchar', length: 100 })
  password: string;

  @Column({ type: 'varchar', length: 100, unique: true })
  email: string;
}

@Entity()
export class Employee extends User {
  @Column({ type: 'decimal', precision: 10, scale: 2 })
  salary: number;
}

@Entity()
export class Administrator extends User {
  @Column({ type: 'boolean', default: false })
  isAdminRoot: boolean;
}