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
    getById(@Param() id:number){
          const response=this.userService.getbyId(id)
          return response
    }
   

    @Post()
    postUser(@Body() userDTO: UserEntity) {
        const user = this.userService.create(userDTO);
        return {"user":user}
    }

    @Put(":id")
    updateUser(
        @Param() id: number,
        @Body() userDTO: UserEntity
    ) {
      const response= this.userService.update(id,userDTO)
      return response
    }


    @Delete()
    deleteUser(@Param() id:number){
       const res= this.userService.deleteUser(id)
       return res
    }
}