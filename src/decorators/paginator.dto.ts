import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsEnum, IsInt, IsOptional, Max, Min } from 'class-validator';

export enum Order {
  asc = 1,
  desc = -1,
}

export class PaginatorDto {
  @ApiPropertyOptional({ enum: Order, default: Order.asc })
  @IsEnum(Order)
  @IsOptional()
  readonly order?: Order = Order.asc;

  @ApiPropertyOptional({ type: String, default: '_id' })
  @IsOptional()
  readonly orderBy?: string = '_id';

  @ApiPropertyOptional({
    minimum: 1,
    default: 1,
  })
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @IsOptional()
  readonly page?: number = 1;

  @ApiPropertyOptional({
    minimum: 1,
    maximum: 50,
    default: 10,
  })
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(50)
  @IsOptional()
  readonly pageSize?: number = 10;
}
