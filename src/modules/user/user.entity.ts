import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { hash } from 'bcrypt';
import { ApiProperty } from '@nestjs/swagger';
import { Role } from '../auth/constants/role';

@Entity()
export class User {
  @ApiProperty({ example: '1', description: 'user id' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: 'test@gmail.com', description: 'user email' })
  @Column({ type: 'varchar', unique: true })
  email: string;

  @ApiProperty({ example: '123456', description: 'user password' })
  @Column({ type: 'varchar' })
  password: string;

  @ApiProperty({ example: Role.USER, description: 'user role' })
  @Column({ type: 'enum', enum: Role, default: Role.USER })
  role: Role;

  @BeforeInsert()
  async hashPassword() {
    this.password = await hash(this.password, 10);
  }
}
