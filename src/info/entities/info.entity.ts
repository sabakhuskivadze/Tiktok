import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("info")
export class Info {
    @PrimaryGeneratedColumn()
    id:number

    @Column()
    username:string

    @Column()
    email:string

    @Column()
    password:string

    @Column()
    address:string

    @Column()
    country:string
}
