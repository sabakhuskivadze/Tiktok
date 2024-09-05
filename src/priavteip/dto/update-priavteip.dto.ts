import { PartialType } from '@nestjs/mapped-types';
import { CreatePriavteipDto } from './create-priavteip.dto';

export class UpdatePriavteipDto extends PartialType(CreatePriavteipDto) {}
