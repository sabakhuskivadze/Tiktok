import { Module } from '@nestjs/common';
import { FilesPhotoService } from './files-photo.service';
import { FilesPhotoController } from './files-photo.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FilesPhoto } from './entities/files-photo.entity';
import { S3Service } from 'src/aws/service/s3.service';

@Module({
  imports:[TypeOrmModule.forFeature([FilesPhoto])],
  controllers: [FilesPhotoController],
  providers: [FilesPhotoService, S3Service],
})
export class FilesPhotoModule {}
