import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserModule } from '../user/user.module';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './local.strategy';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { JwtStrategy } from './jwt.strategy';
import { UserController } from 'src/user/user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'src/user/user.entity';
import { AuthController } from './auth.controller';
import { AuthEntity } from './auth.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([AuthEntity]),
     UserModule,
     PassportModule,
     JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '60s' },
    }),
    ],
  providers: [AuthService, LocalStrategy,JwtStrategy],
  exports: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
