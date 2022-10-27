import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from './user/user.entity';
@Injectable()
export class AppService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepo: Repository<UserEntity>
) { }


  getHello(): string {
    return 'Hello World!';
  }

  // async register(data:any):Promise<UserEntity>{
  //   return this.userRepo.save(data)
  // }
 
}
