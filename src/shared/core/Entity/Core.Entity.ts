import { IsString } from 'class-validator';
import { CreateDateColumn, PrimaryColumn } from 'typeorm';

export class CoreEntity {
  @PrimaryColumn()
  @IsString()
  id: string;

  @CreateDateColumn()
  createdAt: Date;
}
