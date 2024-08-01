import { strict } from "assert";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("register")
export class Register {
    @PrimaryGeneratedColumn()
    id:number

    @Column()
    userInfo:string

    @Column()
    password:string
}
