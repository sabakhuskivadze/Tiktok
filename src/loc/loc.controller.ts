import { Body, Controller, HttpCode, HttpException, HttpStatus, Post } from '@nestjs/common';
import { LocationService } from './loc.service';

@Controller('l')
export class LocationController {
  constructor(private readonly locationService: LocationService) {}

  @Post('/save')
  @HttpCode(HttpStatus.OK)
  async saveLocation(@Body() body: { latitude: number; longitude: number }) {
    const { latitude, longitude } = body;

    if (!latitude || !longitude) {
      throw new HttpException('Invalid data', HttpStatus.BAD_REQUEST);
    }

    try {
      const address = await this.locationService.getAddress(latitude, longitude);
      if (address) {
        const { street, city, formattedAddress } = address;
        console.log(`Address: ${formattedAddress}`); // Log address information
        return {
          address: formattedAddress,
          street,
          city,
          latitude,
          longitude
        };
      } else {
        throw new HttpException('Location not found', HttpStatus.NOT_FOUND);
      }
    } catch (error) {
      console.error('Error fetching location:', error); // Log error
      throw new HttpException('Error fetching location', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
