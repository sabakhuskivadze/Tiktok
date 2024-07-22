import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { SystemInfo } from './entities/system.entity,';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(SystemInfo)
    private system: Repository<SystemInfo>,
  ) {}



  async saveUserInfo(userInfo: Partial<User>): Promise<User> {
    const newUser = this.userRepository.create(userInfo);
    return this.userRepository.save(newUser);
  }

  async saveSystemInfo(systemInfo: Partial<SystemInfo>): Promise<SystemInfo> {
    const newSystemInfo = this.system.create(systemInfo);
    return this.system.save(newSystemInfo);
  }
}
