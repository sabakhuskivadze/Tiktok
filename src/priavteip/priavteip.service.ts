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

  async getIP(): Promise<Priavteip | null> {
    const networkInterfaces = os.networkInterfaces();

    // Attempt to get private IP
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
              console.error('Error saving private IP:', error.message);
              throw new Error(`Error saving private IP: ${error.message}`);
            }
          }
        }
      }
    }

    // If no private IP found, return public IP
    const publicIp = await this.getPublicIP(); // Assume a method to get public IP

    const priavteip = new Priavteip();
    priavteip.address = publicIp;

    try {
      return await this.repository.save(priavteip);
    } catch (error) {
      console.error('Error saving public IP:', error.message);
      throw new Error(`Error saving public IP: ${error.message}`);
    }
  }

  // Example method to get public IP
  async getPublicIP(): Promise<string> {
    // Use an external service or API to get the public IP
    // This is just a placeholder; you might need to implement this
    const response = await fetch('https://api.ipify.org?format=json');
    const data = await response.json();
    return data.ip;
  }
}
