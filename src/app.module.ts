import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import { RegisterModule } from './register/register.module';
import { InfoModule } from './info/info.module';
import { FilesPhotoModule } from './files-photo/files-photo.module';
import { AwsModule } from './aws/aws.module';

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
    RegisterModule, InfoModule, FilesPhotoModule, AwsModule, 
  ],   
})  
export class AppModule {}  
  