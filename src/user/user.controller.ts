import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Res } from "@nestjs/common"
import { UserEntity } from "./user.entity";
import { userService } from "./user.service";

@Controller('users') 
export class UserController {
    constructor(private userService: userService) { }

    @Get()
 getAllData() {
        let response= this.userService.getAll()
        return response
        // res.status(HttpStatus.OK).json({payload:response})
    }

    @Get(':id')
    getById(@Param() params){
          const response=this.userService.getbyId(params.id)
          return response
    }
   

    @Post()
   async postUser(@Body() userDTO: UserEntity) {
       
        const user =await this.userService.create(userDTO);
        return user
    }

    @Put(":id")
    updateUser(
        @Param() params,
        @Body() userDTO: UserEntity
    ) {
      const response= this.userService.update(params.id,userDTO)
      return response
    }


    @Delete(':id')
    deleteUser(@Param() params){
        console.log(params.id," id");
        
       const res= this.userService.deleteUser(params.id)
       return res
    }
}