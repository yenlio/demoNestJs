import { Inject, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "./user.model";
import { UserEntity } from "./user.entity";
import { Repository } from "typeorm";
@Injectable()
export class userService {
    constructor(
        @InjectRepository(UserEntity)
        private userRepo: Repository<UserEntity>
    ) { }

    async getAll() {

        let res = await this.userRepo.find()
        console.log(res," res get");
        return res
    }

    async getbyId(id:number){
        return this.userRepo.findOne({
            where:{id}
        })
    }
    async create(user:UserEntity){
        return this.userRepo.create(user)
    }
    async update(id:number,user:UserEntity){
        let res= await this.userRepo.update(id,user)
        return res
    }
    async deleteUser(id:number){
        await this.userRepo.delete(id)
        return(" thanh cong");
    }













    // private users:User[]=[]

    // insertUser(name:string,age:number){
    //     const id="1"
    //     const newUser= new User("1",name,age);

    //     this.users.push(newUser);
    //     return "1";

    // }

    // getUsers(){
    //     return [...this.users]
    // }

    // getUser(id:string){
    //     return this.users.find((user)=>user.id===id)
    // }

    // updateUser(
    //     id:string,
    //     name:string,
    //     age:number
    // ){

    // }
}


