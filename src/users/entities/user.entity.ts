import { PrimaryGeneratedColumn, Column, Entity } from "typeorm";

@Entity("users")
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userAgent: string;

  @Column('text')
  ipAddress: any;
}
