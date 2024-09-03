import { Body, Controller, Post, Res, HttpStatus } from '@nestjs/common';
import { Response } from 'express';
import { LocationService } from './loc.service';

@Controller("l")
export class LocationController {
  constructor(private readonly locationService: LocationService) {}

  @Post('/save')
  async saveLocation(@Body() body: { latitude: number; longitude: number }, @Res() res: Response) {
    const { latitude, longitude } = body;
    if (!latitude || !longitude) {
      return res.status(HttpStatus.BAD_REQUEST).json({ error: 'Invalid data' });
    }

    try {
      const address = await this.locationService.getAddress(latitude, longitude);
      if (address) {
        const { street, city, formattedAddress } = address;
        res.status(HttpStatus.OK).json({
          address: formattedAddress,
          street,
          city,
          latitude,
          longitude
        });
      } else {
        res.status(HttpStatus.NOT_FOUND).json({ error: 'Location not found' });
      }
    } catch (error) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error: 'Error fetching location' });
    }
  }
}
