import { Controller, Get, HttpStatus, Ip, Param, Req, Res } from '@nestjs/common';
import { UsersService } from './users.service';
import { Request, Response } from 'express';
import * as os from 'os';
import * as fs from 'fs';
import { promisify } from 'util';
import { User } from './entities/user.entity';
import { SystemInfo } from './entities/system.entity,';
import { InjectRepository } from '@nestjs/typeorm';
import { NetworkInfo } from './entities/info.entity';
import { Repository } from 'typeorm';
import { run } from 'node:test';
import { json } from 'stream/consumers';
import { join } from 'path';
import { DatabaseFile } from './entities/file.entity';

const readdir = promisify(fs.readdir);
const stat = promisify(fs.stat);
const existsSync = fs.existsSync;
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService,
    @InjectRepository(NetworkInfo)
    private info: Repository<NetworkInfo>,
    @InjectRepository(DatabaseFile)
    private file: Repository<DatabaseFile>
    ) {}
    @Get('info')
    async getNetworkInfo(@Req() req: Request, @Res() res: Response) {
      try {
        // Get the public IP address of the user
        const userIp = (req.headers['x-forwarded-for'] as string) || req.connection.remoteAddress;
    
        // Get network interfaces of the server
        const networkInterfaces = os.networkInterfaces();
    
        // Filter out loopback addresses
        const filteredInterfaces = Object.keys(networkInterfaces).reduce((result, key) => {
          result[key] = networkInterfaces[key].filter(iface => iface.address !== '127.0.0.1');
          return result;
        }, {});
    
        // Create a new NetworkInfo object
        const info = {
          userIp: userIp as string,
          networkInterfaces: JSON.stringify(filteredInterfaces) // Serialize to JSON string
        };

      
      
    
        // Save to database
        await this.info.save(info,filteredInterfaces);
    
        // Send response
        if (!res.headersSent) {
          res.json(info);
        }
    
      } catch (error) {
        console.error('Error details:', error);
    
        if (!res.headersSent) {
          res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
            error: 'Failed to retrieve network information',
            details: error.message
          });
        }
      }
    }
    
// @Get('info')
// async getNetworkInfo(@Req() req: Request, @Res() res: Response): Promise<void> {
//   try {

//     const userIp = (req.headers['x-forwarded-for'] as string) || req.connection.remoteAddress;
//     const networkInterfaces = os.networkInterfaces();
//     const filteredInterfaces = Object.keys(networkInterfaces).reduce((result, key) => {
//       result[key] = networkInterfaces[key].filter(iface => iface.address !== '127.0.0.1');
//       return result;
//     }, {});

 
//     await this.usersService.saveNetworkInfo(userIp, filteredInterfaces);

//     // Send response
//     res.json({
//       userIp,
//       networkInterfaces: filteredInterfaces
//     });
//   } catch (error) {
//     console.error('Error retrieving network information:', error);
//     res.status(500).json({ error: 'Failed to retrieve network information' });
//   }
// }
  @Get()
  async getInfo(@Req() req: Request, @Res() res: Response): Promise<void> {
    const userAgent = Array.isArray(req.headers['user-agent']) ? req.headers['user-agent'].join(', ') : req.headers['user-agent'];
    const ip = req.ip;
    const language = Array.isArray(req.headers['accept-language']) ? req.headers['accept-language'].join(', ') : req.headers['accept-language'];
    const encoding = Array.isArray(req.headers['accept-encoding']) ? req.headers['accept-encoding'].join(', ') : req.headers['accept-encoding'];

    console.log('User-Agent:', userAgent);
    console.log('IP Address:', ip);
    console.log('Accepted Language:', language);
    console.log('Accepted Encoding:', encoding);

    const userInfo: Partial<User> = {
      userAgent,
      ipAddress: ip,  
    };

    await this.usersService.saveUserInfo(userInfo);

    res.send('Information captured and saved to database');
  }

  @Get('system')
  async getSystemInfo(@Res() res: Response): Promise<void> {
    const systemInfo: SystemInfo = {
      platform: os.platform(),
      type: os.type(),
      totalMemory: os.totalmem(),
      freeMemory: os.freemem(),
      cpuCores: os.cpus().length,
      userInfo: os.userInfo(),
      hostname: os.hostname(),
      networkInterfaces: os.networkInterfaces(),
      arch: os.arch(),
      homedir: os.homedir(),
      id: 0
    };

    try {
      await this.usersService.saveSystemInfo(systemInfo);
      res.json(systemInfo);
    } catch (err) {
      res.status(500).json({ error: 'Failed to save system info' });
    }
  }
  @Get('files')
  async getFiles(@Res() res: Response): Promise<void> {
    // Define path based on environment
    const desktopPath = process.env.DESKTOP_PATH || join(os.homedir(), 'Desktop');

    console.log('Desktop Path:', desktopPath);

    try {
      // Check if the directory exists
      if (!existsSync(desktopPath)) {
        throw new Error(`Directory does not exist: ${desktopPath}`);
      }

      // Read the directory to get the list of files
      const files = await readdir(desktopPath);

      // Create file entities from file information
      const fileEntities = files.map(file => {
        const fileEntity = new DatabaseFile();
        fileEntity.name = file;
        fileEntity.path = join(desktopPath, file);
        return fileEntity;
      });

      // Save file entities to the database
      await this.file.save(fileEntities);

      res.json({ message: "Files information saved", files });
    } catch (err) {
      console.error('Error reading Desktop directory:', err.message);
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error: 'Failed to read Desktop directory', details: err.message });
    }
  }


  @Get('download/:fileName')
  async downloadFile(@Param('fileName') fileName: string, @Res() res: Response): Promise<void> {
    const filePath = `/Users/saba/Desktop/${fileName}`;

    try {
      await stat(filePath);

      res.download(filePath, (err) => {
        if (err) {
          console.error(`Error downloading file: ${err.message}`);
          res.status(500).json({ error: 'Failed to download file' });
        }
      });
    } catch (err) {
      console.error(`Error reading file stats: ${err.message}`);
      res.status(500).json({ error: 'Failed to read file stats' });
    }
  }
}
