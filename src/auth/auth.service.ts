import { Injectable } from '@nestjs/common';
import { userService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/user/user.entity';
import { Repository } from 'typeorm';
import { AuthEntity } from './auth.entity';

@Injectable()
export class AuthService {
    constructor( 
        @InjectRepository(AuthEntity) private authRepo: Repository<AuthEntity>, 
        // private usersService: userService, private jwtService: JwtService
        ) { }

    // async validateUser(username: string, pass: string): Promise<any> {
    //     const user = await this.usersService.getbyName(username);
    //     if (user && user.Password === pass) {
    //         const result = {
    //             id: user.Id,
    //             userName: user.Name
    //         };
    //         return result;
    //     }
    //     return null;
    // }

    // async login(user: any) {
    //     const payload = { username: user.Name, sub: user.Id };
    //     console.log(payload, " payload login");

    //     return {
    //         access_token: this.jwtService.sign(payload),
    //     };
    // }
    async register(data: any): Promise<any> {
        console.log(data," data in ser");

        return this.authRepo.save({
            User:data.User,
            Password:data.hashedPass
        });
    }

    async findOne (condition:any):Promise<AuthEntity>{
        return this.authRepo.findOne({
            where:condition
        })

    }
}