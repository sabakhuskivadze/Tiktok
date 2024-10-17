import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { SystemInfo } from './entities/system.entity,';
import { info } from 'console';
import { NetworkInfo } from './entities/info.entity';
import { NetworkInterfaceInfo, networkInterfaces } from 'os';

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
async getLocalIP() {
  const nets = networkInterfaces(); // This returns an object of interfaces
  for (const net of Object.values(nets)) {
      // Check if net is defined and is an array
      if (Array.isArray(net)) {
          for (const iface of net) {
              // Check if it is IPv4 and not internal
              if (iface.family === 'IPv4' && !iface.internal) {
                  return iface.address;
              }
          }
      }
  }
  return null; 

}
} 


