import { IsNumber, IsString } from 'class-validator';
import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from '@nestjs/class-validator';
import { cnpj } from 'cpf-cnpj-validator';

@ValidatorConstraint({ name: 'customText', async: false })
export class ValidateCnpj implements ValidatorConstraintInterface {
  validate(value: string) {
    return cnpj.isValid(value);
  }

  defaultMessage() {
    return 'Text ($value) is not a valid cnpj!';
  }
}

export class CreateLocationDto {
  @IsString()
  name: string;
  @IsString()
  number: string;
  @IsString()
  district: string;
  @IsString()
  city: string;
  @IsString()
  state: string;
  @IsString()
  zipCode: string;
  @IsString()
  street: string;
  @IsNumber()
  companyId: number;
}

export class UpdateLocationDto {
  @IsString()
  name: string;
  @IsString()
  number: string;
  @IsString()
  district: string;
  @IsString()
  city: string;
  @IsString()
  state: string;
  @IsString()
  zipCode: string;
  @IsString()
  street: string;
  @IsNumber()
  companyId: number;
}
