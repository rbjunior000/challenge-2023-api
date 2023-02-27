import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Put,
  Delete,
  Query,
  UseGuards,
} from '@nestjs/common';
import { LocationService } from '../service/location.service';
import { Location } from '@prisma/client';
import { ApiTags } from '@nestjs/swagger';
import { CreateLocationDto, UpdateLocationDto } from './location.dto';
import { PaginatorDto } from 'src/decorators/paginator.dto';
import { HasAuthorization } from 'src/decorators/has-authorization';
@Controller('api/v1/location')
@ApiTags('Location')
export class LocationController {
  constructor(private readonly locationService: LocationService) {}
  @Get('/company/:id')
  @UseGuards(HasAuthorization)
  async getAllLocationsByCompany(
    @Param('id') id: number,
    @Query() params: PaginatorDto,
  ): Promise<Location[]> {
    return this.locationService.getAllLocationByCompany(id, params);
  }
  @Get()
  @UseGuards(HasAuthorization)
  async getAllLocation(@Query() params: PaginatorDto): Promise<Location[]> {
    return this.locationService.getAllLocation(params);
  }
  @Post()
  @UseGuards(HasAuthorization)
  async createLocation(@Body() postData: CreateLocationDto): Promise<Location> {
    return this.locationService.createLocation(postData);
  }
  @Get(':id')
  @UseGuards(HasAuthorization)
  async getLocation(@Param('id') id: number): Promise<Location | null> {
    return this.locationService.getLocation(id);
  }
  @Put(':id')
  @UseGuards(HasAuthorization)
  async Update(
    @Param('id') id: number,
    @Body() postData: UpdateLocationDto,
  ): Promise<Location> {
    return this.locationService.updateLocation(id, postData);
  }
  @Delete(':id')
  @UseGuards(HasAuthorization)
  async Delete(@Param('id') id: number): Promise<Location> {
    return this.locationService.deleteLocation(id);
  }
}
