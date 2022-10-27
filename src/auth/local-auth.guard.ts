import { Injectable, Post, UseGuards ,Request} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {
    @UseGuards(LocalAuthGuard)
    @Post('auth/login')
    async login(@Request() req) {
        console.log(req," log");
        
        return req.user;
    }

}