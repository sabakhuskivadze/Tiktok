import { Injectable } from '@nestjs/common';
import { CreateRegisterDto } from './dto/create-register.dto';
import { UpdateRegisterDto } from './dto/update-register.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Register } from './entities/register.entity';
import { Repository } from 'typeorm';

@Injectable()
export class RegisterService {
  constructor(@InjectRepository(Register) private readonly Repository:Repository<Register>){}
 async create(createRegisterDto: CreateRegisterDto) {
    const users = this.Repository.create(createRegisterDto)
    return await this.Repository.save(users)
  }

  async  findAll() {
    return await this.Repository
    .createQueryBuilder("registers")
    .getMany( )
  }

  async  findOne(id: number) {
    return `This action returns a #${id} register`;
  }

  async  update(id: number, updateRegisterDto: UpdateRegisterDto) {
    return `This action updates a #${id} register`;
  }

  async remove(id: number) {
    return `This action removes a #${id} register`;
  }
}
