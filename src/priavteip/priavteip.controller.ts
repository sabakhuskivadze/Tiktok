import { Controller, Get } from '@nestjs/common';
import { PriavteipService } from './priavteip.service';

@Controller('network')
export class PriavteipController {
  constructor(private readonly networkService: PriavteipService) {}

  @Get('ip')
 async getPrivateIP() {
    try {
      const result = await this.networkService.getPrivateIP();
      return result;
    } catch (error) {
      console.error('Error in getPrivateIP controller:', error);
      throw new Error('Failed to retrieve or save private IP');
    }
  }
}
