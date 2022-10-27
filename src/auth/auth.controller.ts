import { Controller, Request, Post, UseGuards, Body, Get, BadRequestException, Res } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';

import * as bcrypt from 'bcrypt';
import { AuthService } from './auth.service';

@Controller("auth")
export class AuthController {

  constructor(private authService: AuthService, private jwtService: JwtService) { }

  @Post('register')
  async register(
    @Body('User') User: string,
    @Body('Password') Password: string
  ) {
    console.log(User, Password, " du lieu");

    const saltOrRounds = 10;
    const hashedPass = await bcrypt.hash(Password, saltOrRounds)
    return this.authService.register({ User, hashedPass })
  }

  @Post('login')
  async login(
    @Body('User') User: string,
    @Body('Password') Password: string,
    @Res({ passthrough: true }) response: Response
  ) {
    const user = await this.authService.findOne({ User })
    if (!user) {
      throw new BadRequestException(" khong ton tai tai khoan")
    }
    else {
      const jwt = await this.jwtService.signAsync({ id: user.Id })
      response.cookie("jwt", jwt, { httpOnly: true })
      return {
        message: "thanh cong"
      };
    }
  }

  // @UseGuards(LocalAuthGuard)
  //   @Post('auth/login')
  //   async login(@Request() req) {

  //     console.log(req.body, "app contronller");
  //     return this.authService.login(req.body);
  //   }

}