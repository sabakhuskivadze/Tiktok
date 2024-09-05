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

  async getPrivateIP(): Promise<string | null> {
    try {
      // Execute the command
      const { stdout, stderr } = await execPromise('ifconfig | grep "inet " | grep -v 127.0.0.1');
      
      if (stderr) {
        console.error('Error executing command:', stderr);
        return null;
      }

      // Process the output
      const lines = stdout.trim().split('\n');
      if (lines.length > 0) {
        // Return the first non-loopback IP address
        return lines[0].split(' ')[1];
      }
      
      return null;
    } catch (error) {
      console.error('Error running command:', error.message);
      return null;
    }
  }
}
