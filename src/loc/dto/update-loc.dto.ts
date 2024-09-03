import { PartialType } from '@nestjs/mapped-types';
import { CreateLocDto } from './create-loc.dto';

export class UpdateLocDto extends PartialType(CreateLocDto) {}
