import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserEntity } from './user/user.entity';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { AuthEntity } from './auth/auth.entity';
import { MulterModule } from '@nestjs/platform-express';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
// const defaultOptions = {

// };

@Module({
  imports: [
    MulterModule.register({
      dest: './uploads',
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'files')
    }),
    TypeOrmModule.forRoot({
      type:'oracle',
      host:'localhost',
      port:1521,
      username:'yennh',
      database:'yennh',
      password:'123456',
      sid:'orcl',
      synchronize:true,
      entities:[UserEntity],
      autoLoadEntities: true
      
    }),
    TypeOrmModule.forRoot({
      type:'oracle',
      host:'localhost',
      port:1521,
      username:'yennh',
      database:'yennh',
      password:'123456',
      sid:'orcl',
      synchronize:true,
      entities:[AuthEntity],
      autoLoadEntities: true
      
    }),
    TypeOrmModule.forFeature([UserEntity]),
    TypeOrmModule.forFeature([AuthEntity]),
    UserModule,
    AuthModule],  
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
