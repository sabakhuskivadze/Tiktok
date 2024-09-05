import { Module } from '@nestjs/common';
import { PriavteipService } from './priavteip.service';
import { PriavteipController } from './priavteip.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Priavteip } from './entities/priavteip.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Priavteip])],
  controllers: [PriavteipController],
  providers: [PriavteipService],
})
export class PriavteipModule {}
