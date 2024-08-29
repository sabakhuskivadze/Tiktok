import { Injectable } from '@nestjs/common';
import { CreateInfoDto } from './dto/create-info.dto';
import { UpdateInfoDto } from './dto/update-info.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Info } from './entities/info.entity';
import { Repository } from 'typeorm';

@Injectable()
export class InfoService {
  constructor(@InjectRepository(Info) private readonly Repository: Repository<Info>) { }
  async create(createInfoDto: CreateInfoDto) {
    const user = this.Repository.create(createInfoDto)
    return await this.Repository.save(user)
  }

  async findAll() {
    return await this.Repository
    .createQueryBuilder("info")
    .getMany()
  }

  async findOne(id: number) {
    return await this.Repository
    .createQueryBuilder("info")
    .where("info.id == :id",{id})
    .getOne()
  }

  async update(id: number, updateInfoDto: UpdateInfoDto) {
    return await this.Repository
    .createQueryBuilder("info")
    .update()
    .set(updateInfoDto)
    .where("info.id == :id",{id})
    .execute()
  }

  async remove(id: number) {
    return `This action removes a #${id} info`;
  }
}
