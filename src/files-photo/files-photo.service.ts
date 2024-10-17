import { Injectable } from '@nestjs/common';
import { CreateFilesPhotoDto } from './dto/create-files-photo.dto';
import { UpdateFilesPhotoDto } from './dto/update-files-photo.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { FilesPhoto } from './entities/files-photo.entity';
import { Repository } from 'typeorm';
import { S3Service } from 'src/aws/service/s3.service';

@Injectable()
export class FilesPhotoService {

  constructor(@InjectRepository(FilesPhoto) private readonly Repository:Repository<FilesPhoto>, private readonly s3Service:S3Service) {}
 async create(file1: Express.Multer.File) {
   const file = new FilesPhoto()

  

   console.log(file1);
   const result = await this.s3Service.upload({
    file: file1.buffer,
    name: file1.originalname,
    mimetype: file1.mimetype,
  });

  
  file.url = "google.com"
  file.filename = "file"
  file.location = result.Location
  file.bucket = result.Bucket
   return await this.Repository.save(file)
  }

  findAll() {
    return `This action returns all filesPhoto`;
  }

  findOne(id: number) {
    return `This action returns a #${id} filesPhoto`;
  }

  update(id: number, updateFilesPhotoDto: UpdateFilesPhotoDto) {
    return `This action updates a #${id} filesPhoto`;
  }

  remove(id: number) {
    return `This action removes a #${id} filesPhoto`;
  }
}
