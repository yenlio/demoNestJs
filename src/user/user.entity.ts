import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class UserEntity{
    @PrimaryGeneratedColumn('increment')
    Id:number;

    @Column()
    Name:string;

    @Column()
    Age:number;
}