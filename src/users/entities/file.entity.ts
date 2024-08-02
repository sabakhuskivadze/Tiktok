// file.entity.ts
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity("file")
export class DatabaseFile {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  path: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
}
