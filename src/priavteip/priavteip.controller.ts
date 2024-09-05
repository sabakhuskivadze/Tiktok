import { Controller, Get, Req } from '@nestjs/common';
import { PriavteipService } from './priavteip.service';
import { Request } from 'express';
@Controller('network')
export class PriavteipController {
  constructor(private readonly networkService: PriavteipService) {}
  @Get()
  async getPrivateIP(): Promise<string> {
    const ip = await this.networkService.getPrivateIP();
    return ip ? `Private IP address is ${ip}` : 'Private IP address not found';
  }
}
