import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Put,
  Delete,
  Req,
  UseGuards,
  Query,
} from '@nestjs/common';
import { CompanyService } from '../service/company.service';
import { Company } from '@prisma/client';
import { ApiTags } from '@nestjs/swagger';
import { CreateCompanyDto, UpdateCompanyDto } from './company.dto';
import { HasAuthorization } from 'src/decorators/has-authorization';
import { PaginatorDto } from 'src/decorators/paginator.dto';
@Controller('api/v1/company')
@ApiTags('Company')
export class CompanyController {
  constructor(private readonly companyService: CompanyService) {}
  @Get()
  @UseGuards(HasAuthorization)
  async getAllCompany(
    @Query() params: PaginatorDto,
    @Req() req,
  ): Promise<Company[]> {
    return this.companyService.getAllCompany(params, req.userId);
  }
  @Post()
  @UseGuards(HasAuthorization)
  async createCompany(
    @Body() postData: CreateCompanyDto,
    @Req() req,
  ): Promise<Company> {
    const data = {
      ...postData,
      userId: req.userId,
    };
    return this.companyService.createCompany(data);
  }
  @Get(':id')
  @UseGuards(HasAuthorization)
  async getCompany(@Param('id') id: number): Promise<Company | null> {
    return this.companyService.getCompany(id);
  }
  @Put(':id')
  @UseGuards(HasAuthorization)
  async Update(
    @Param('id') id: number,
    @Body() putData: UpdateCompanyDto,
  ): Promise<Company> {
    return this.companyService.updateCompany(id, putData);
  }
  @Delete(':id')
  async Delete(@Param('id') id: number): Promise<Company> {
    return this.companyService.deleteCompany(id);
  }
}
