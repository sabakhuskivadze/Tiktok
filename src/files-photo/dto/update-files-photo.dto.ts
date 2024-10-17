import { PartialType } from '@nestjs/mapped-types';
import { CreateFilesPhotoDto } from './create-files-photo.dto';

export class UpdateFilesPhotoDto extends PartialType(CreateFilesPhotoDto) {}
