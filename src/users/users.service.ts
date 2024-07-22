import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { SystemInfo } from './entities/system.entity,';
import { info } from 'console';
import { NetworkInfo } from './entities/info.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(SystemInfo)
    private system: Repository<SystemInfo>,
    @InjectRepository(NetworkInfo)
    private info: Repository<NetworkInfo>,
  ) {}



  async saveUserInfo(userInfo: Partial<User>): Promise<User> {
    const newUser = this.userRepository.create(userInfo);
    return this.userRepository.save(newUser);
  }

  async saveSystemInfo(systemInfo: Partial<SystemInfo>): Promise<SystemInfo> {
    const serializedUserInfo = JSON.stringify(systemInfo.userInfo);
    const serializedNetworkInterfaces = JSON.stringify(systemInfo.networkInterfaces);

    const newSystemInfo = this.system.create({
      ...systemInfo,
      userInfo: serializedUserInfo,
      networkInterfaces: serializedNetworkInterfaces,
    });

    try {
      return await this.system.save(newSystemInfo);
    } catch (error) {
      console.error('Error saving system info:', error);
      throw new Error('Failed to save system info');
    }

}
async saveNetworkInfo(userIp: string, networkInterfaces: any): Promise<void> {
  const networkInfo = new NetworkInfo();
  networkInfo.userIp = userIp;
  networkInfo.networkInterfaces = networkInterfaces;

  await this.info.save(networkInfo);
}
}