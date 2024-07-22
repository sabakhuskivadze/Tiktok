import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { SystemInfo } from './entities/system.entity,';
import { NetworkInfo } from './entities/info.entity';

@Module({
  imports:[TypeOrmModule.forFeature([User,SystemInfo,NetworkInfo])],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
   