import { Body, Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma.service';
import { Company, Prisma } from '@prisma/client';
import { createPaginator } from 'prisma-pagination';
import { PaginatorDto } from 'src/decorators/paginator.dto';

const paginate = createPaginator({ perPage: 10 });

@Injectable()
export class CompanyService {
  constructor(private prisma: PrismaService) {}
  async getAllCompany(
    params: PaginatorDto,
    userId: number,
  ): Promise<Company[]> {
    const result: any = await paginate<Company, Prisma.CompanyFindManyArgs>(
      this.prisma.company,
      {
        where: {
          userId,
        },
        orderBy: {
          id: 'desc',
        },
      },
      { page: params?.page || 1 },
    );

    return result;
  }
  async getCompany(id: number): Promise<Company | null> {
    return this.prisma.company.findUnique({ where: { id: Number(id) } });
  }

  async createCompany(
    @Body() data: Omit<Company, 'id' | 'locationId'>,
  ): Promise<Company> {
    data.document = data.document.replace(/[^0-9]+/g, '');
    return this.prisma.company.create({
      data,
    });
  }
  async updateCompany(
    id: number,
    @Body() data: Omit<Company, 'id' | 'locationId' | 'userId'>,
  ): Promise<Company> {
    return this.prisma.company.update({
      where: { id: Number(id) },
      data,
    });
  }
  async deleteCompany(id: number): Promise<Company> {
    return this.prisma.company.delete({
      where: { id: Number(id) },
    });
  }
}
