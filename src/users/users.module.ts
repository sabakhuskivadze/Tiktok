import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { SystemInfo } from './entities/system.entity,';

@Module({
  imports:[TypeOrmModule.forFeature([User,SystemInfo])],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
   