// import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile } from '@nestjs/common';
// import { FilesPhotoService } from './files-photo.service';
// import { CreateFilesPhotoDto } from './dto/create-files-photo.dto';
// import { UpdateFilesPhotoDto } from './dto/update-files-photo.dto';
// import { FileInterceptor } from '@nestjs/platform-express';

// @Controller('photo')
// export class FilesPhotoController {
//   constructor(private readonly filesPhotoService: FilesPhotoService) {}

//   @Post("uploud")
//   @UseInterceptors(FileInterceptor("file"))
//   create(@UploadedFile() file: Express.Multer.File) {
//     return this.filesPhotoService.create(file);
//   }

//   @Get()
//   findAll() {
//     return this.filesPhotoService.findAll();
//   }

//   @Get(':id')
//   findOne(@Param('id') id: string) {
//     return this.filesPhotoService.findOne(+id);
//   }

//   @Patch(':id')
//   update(@Param('id') id: string, @Body() updateFilesPhotoDto: UpdateFilesPhotoDto) {
//     return this.filesPhotoService.update(+id, updateFilesPhotoDto);
//   }

//   @Delete(':id')
//   remove(@Param('id') id: string) {
//     return this.filesPhotoService.remove(+id);
//   }
// }
