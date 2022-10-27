import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class AuthEntity{
    @PrimaryGeneratedColumn('increment')
    Id:number;

    @Column()
    User:string;

    @Column()
    Password:string;
}