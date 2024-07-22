import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('system')
export class SystemInfo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  platform: string;

  @Column()
  type: string;

  @Column('bigint')
  totalMemory: number;

  @Column('bigint')
  freeMemory: number;

  @Column()
  cpuCores: number;

  @Column('json')
  userInfo: any;

  @Column()
  hostname: string;

  @Column('json')
  networkInterfaces: any;

  @Column()
  arch: string;

  @Column()
  homedir: string;
}
