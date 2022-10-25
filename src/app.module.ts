import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserEntity } from './user/user.entity';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type:'oracle',
      host:'localhost',
      port:1521,
      username:'yennh',
      database:'yennh',
      password:'123456',
      sid:'orcl',
      entities:[UserEntity],
      synchronize:true
    }),
    UserModule],  
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
