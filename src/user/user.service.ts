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
        console.log(" res gettt");
        return res
    }
    async getbyId(Id:number){
        let res=await this.userRepo.findOne({
            where:{Id}
        })
        return res
    }
    async create(user:UserEntity):Promise <UserEntity>{
        try {
            const res= await this.userRepo.save({Id:user.Id,Name:user.Name,Age:user.Age});  
            return(res)
        } catch (error) {
            return error;
        }  
    }
    async update(Id:number,user:UserEntity){
        console.log(Id, user," du lieu");
        
        let res= await this.userRepo.update(Id,user)
        return res
    }
    async deleteUser(id:number):Promise<string>{
       try {
           console.log(id," id in serviece"); 
       await this.userRepo.delete(id)
       return("thanh cong")
       } catch (error) {
        return error;
       }
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


