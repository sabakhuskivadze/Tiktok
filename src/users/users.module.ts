import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { SystemInfo } from './entities/system.entity,';
import { NetworkInfo } from './entities/info.entity';
import { DatabaseFile } from './entities/file.entity';

@Module({
  imports:[TypeOrmModule.forFeature([User,SystemInfo,NetworkInfo,DatabaseFile])],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
   