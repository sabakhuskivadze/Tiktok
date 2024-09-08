import { Controller, Get, Req } from '@nestjs/common';
import { PriavteipService } from './priavteip.service';
import { Request } from 'express';
@Controller('network')
export class PriavteipController {
  constructor(private readonly networkService: PriavteipService) {}
  @Get()
  getIp(@Req() request: Request): string {
    const ip = this.networkService.getPublicIp(request);
    return ip ? `Your public IP address is ${ip}` : 'Public IP address not found';
  }
}
