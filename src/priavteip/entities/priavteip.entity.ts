import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("priavateIp")
export class Priavteip {
    @PrimaryGeneratedColumn()
    id:number

    @Column()
  address: string;
}
