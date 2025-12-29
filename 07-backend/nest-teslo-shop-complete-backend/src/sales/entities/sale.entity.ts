import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';

@Entity('sales')
export class Sale {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('jsonb', { nullable: true })
  items: any[];

  @Column('float', { nullable: true })
  total: number;

  @CreateDateColumn()
  createdAt: Date;

  // 👇 CLAVE: permitir null temporalmente
  @Column({ type: 'int', nullable: true })
  month: number;

  @Column({ type: 'int', nullable: true })
  year: number;
}
