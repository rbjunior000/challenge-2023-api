import { IsNumber, IsString } from 'class-validator';
import {
  Validate,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from '@nestjs/class-validator';
import { cnpj } from 'cpf-cnpj-validator';
import { IsUnique } from 'src/decorators/isUnique';

@ValidatorConstraint({ name: 'customText', async: false })
export class ValidateCnpj implements ValidatorConstraintInterface {
  validate(value: string) {
    return cnpj.isValid(value);
  }

  defaultMessage() {
    return 'Text ($value) is not a valid cnpj!';
  }
}

export class CreateCompanyDto {
  @IsString()
  name: string;
  @IsString()
  website: string;
  @Validate(ValidateCnpj)
  @IsUnique('company', 'document')
  document: string;
  @IsNumber()
  userId: number;
  // @IsNumber()
  // locationId: number;
}

export class UpdateCompanyDto {
  @IsString()
  name: string;
  @IsString()
  website: string;
  @Validate(ValidateCnpj)
  document: string;
  @IsNumber()
  userId: number;
  // @IsNumber()
  // locationId: number;
}
