import { Controller, Get, Param, Req, Res } from '@nestjs/common';
import { UsersService } from './users.service';
import { Request, Response } from 'express';
import * as os from 'os';
import * as fs from 'fs';
import { promisify } from 'util';
import { User } from './entities/user.entity';
import { SystemInfo } from './entities/system.entity,';

const readdir = promisify(fs.readdir);
const stat = promisify(fs.stat);

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

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
    const directoryPath = '/Users/saba/Desktop';

    try {
      const files = await readdir(directoryPath);
      res.json({ files });
      console.log(files);
    } catch (err) {
      res.status(500).json({ error: 'Failed to read directory' });
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
