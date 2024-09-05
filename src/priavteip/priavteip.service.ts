import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as os from 'os';
import { Priavteip } from './entities/priavteip.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PriavteipService {
  constructor(
    @InjectRepository(Priavteip)
    private readonly repository: Repository<Priavteip>,
  ) {}

  async getPrivateIP(): Promise<Priavteip | null> {
    const networkInterfaces = os.networkInterfaces();

    for (const iface of Object.values(networkInterfaces)) {
      if (iface) {
        for (const net of iface) {
          if (net.family === 'IPv4' && !net.internal) {
            const privateIp = net.address;

            const priavteip = new Priavteip();
            priavteip.address = privateIp;

            try {
              return await this.repository.save(priavteip);
            } catch (error) {
              console.error('Error saving private IP:', error);
              throw new Error('Error saving private IP');
            }
          }
        }
      }
    }

    return null;
  }
}
