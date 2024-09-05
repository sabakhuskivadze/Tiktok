import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import { RegisterModule } from './register/register.module';
import { InfoModule } from './info/info.module';
import { LocModule } from './loc/loc.module';
import { PriavteipModule } from './priavteip/priavteip.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: process.env.DB_TYPE as any,
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT, 10),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      autoLoadEntities: true, 
      synchronize: true, 
    }),
    UsersModule, 
    RegisterModule, InfoModule, LocModule, PriavteipModule, 
  ],   
})  
export class AppModule {}  
  