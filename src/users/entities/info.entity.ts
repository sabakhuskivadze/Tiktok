import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity('network')
export class NetworkInfo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userIp: string;

  @Column('text')
  networkInterfaces: any;


}