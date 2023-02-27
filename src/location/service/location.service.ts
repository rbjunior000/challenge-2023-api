import { Body, Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma.service';
import { Location, Prisma } from '@prisma/client';
import { createPaginator } from 'prisma-pagination';
import { PaginatorDto } from 'src/decorators/paginator.dto';

const paginate = createPaginator({ perPage: 10 });

@Injectable()
export class LocationService {
  constructor(private prisma: PrismaService) {}
  async getAllLocationByCompany(
    companyId: number,
    params: PaginatorDto,
  ): Promise<Location[]> {
    const result: any = await paginate<Location, Prisma.UserFindManyArgs>(
      this.prisma.location,
      {
        where: {
          companyId,
        },
        orderBy: {
          id: 'desc',
        },
      },
      { page: params?.page || 1 },
    );
    return result;
  }
  async getAllLocation(params: PaginatorDto): Promise<Location[]> {
    const result: any = await paginate<Location, Prisma.UserFindManyArgs>(
      this.prisma.location,
      {
        orderBy: {
          id: 'desc',
        },
      },
      { page: params?.page || 1 },
    );
    return result;
  }
  async getLocation(id: number): Promise<Location | null> {
    return this.prisma.location.findUnique({ where: { id: Number(id) } });
  }
  async createLocation(@Body() data: Omit<Location, 'id'>): Promise<Location> {
    return this.prisma.location.create({
      data,
    });
  }
  async updateLocation(
    id: number,
    @Body() data: Omit<Location, 'id'>,
  ): Promise<Location> {
    return this.prisma.location.update({
      where: { id: Number(id) },
      data,
    });
  }
  async deleteLocation(id: number): Promise<Location> {
    return this.prisma.location.delete({
      where: { id: Number(id) },
    });
  }
}
