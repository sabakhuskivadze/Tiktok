import { Injectable, Logger } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class LocationService {
  private readonly logger = new Logger(LocationService.name);

  async getAddress(latitude: number, longitude: number): Promise<{ street: string; city: string; formattedAddress: string } | null> {
    try {
      const response = await axios.get('https://nominatim.openstreetmap.org/reverse', {
        params: {
          lat: latitude,
          lon: longitude,
          format: 'json',
          addressdetails: 1,
        },
      });

      const address = response.data.address;
      if (address) {
        const street = address.road || address.street;
        const city = address.city || address.town || address.village;
        const formattedAddress = `${street || ''}, ${city || ''}`;

        // Log address information
        this.logger.log(`Address: ${formattedAddress}`);
        return {
          street,
          city,
          formattedAddress,
        };
      }
      return null;
    } catch (error) {
      this.logger.error('Error fetching location:', error);
      throw error;
    }
  }
}
