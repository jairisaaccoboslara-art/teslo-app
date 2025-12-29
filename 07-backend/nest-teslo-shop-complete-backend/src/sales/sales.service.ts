import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Sale } from './entities/sale.entity';
import { CreateSaleDto } from './dto/create-sale.dto';

@Injectable()
export class SalesService {
  constructor(
    @InjectRepository(Sale)
    private readonly saleRepository: Repository<Sale>, // mejor nombre
  ) {}

  async create(createSaleDto: CreateSaleDto): Promise<Sale> {
    const now = new Date();

    const sale = this.saleRepository.create({
      ...createSaleDto,
      createdAt: now,
      month: now.getMonth() + 1,
      year: now.getFullYear(),
    });

    return this.saleRepository.save(sale);
  }

  async findAll(): Promise<Sale[]> {
    return this.saleRepository.find({
      order: { createdAt: 'DESC' },
    });
  }
}
