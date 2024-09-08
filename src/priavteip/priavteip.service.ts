import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as os from 'os';
import { Priavteip } from './entities/priavteip.entity';
import { Repository } from 'typeorm';
import { exec } from 'child_process';
import { promisify } from 'util';
const execPromise = promisify(exec);
@Injectable()
export class PriavteipService {
  constructor(
    @InjectRepository(Priavteip)
    private readonly repository: Repository<Priavteip>,
  ) {}

  getPublicIp(request: Request): string | null {
    // Retrieve the public IP address from headers
    const ip = request.headers['x-forwarded-for'] || request.connection.remoteAddress;
    
    // Convert to string and return
    return typeof ip === 'string' ? ip.split(',')[0].trim() : null;
  }
}
