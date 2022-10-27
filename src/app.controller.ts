import { Controller, Request, Post, UseGuards, Body } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth/auth.service';
import { userService } from './user/user.service';
import { LocalAuthGuard } from './auth/local-auth.guard';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import * as bcrypt from 'bcrypt';
import { AppService } from './app.service';
@Controller()
export class AppController {

  constructor(private authService: AuthService) { }

  // @Post('auth/register')
  // async register(
  //   @Body('Name') Name: string,
  //   @Body('Password') Password: string
  // ) {
  //   const saltOrRounds = 10;
  //    const hashedPass= await bcrypt.hash(Password,saltOrRounds)
  //    return this.authService.register({Name,Password})
  // }

  // // @UseGuards(LocalAuthGuard)
  // @Post('auth/login')
  // async login(@Request() req) {
    
  //   console.log(req.body, "app contronller");
  //   return this.authService.login(req.body);
  // }

}