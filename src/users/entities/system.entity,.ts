import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('system')
export class SystemInfo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  platform: string;

  @Column()
  type: string;

  @Column()
  totalMemory: number;

  @Column()
  freeMemory: number;

  @Column()
  cpuCores: number;

  @Column('text') // Use 'text' for userInfo and networkInterfaces
  userInfo: any;

  @Column()
  hostname: string;

  @Column('text')
  networkInterfaces: any;

  @Column()
  arch: string;

  @Column()
  homedir: string;
}
