import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("photo")
export class FilesPhoto {
    @PrimaryGeneratedColumn()
    id:number

    @Column()
    url:string

    @Column()
    location:string


    @Column()
    bucket:string

    @Column()
    filename:string
}
