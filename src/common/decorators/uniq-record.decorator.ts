import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';
import { getConnection } from 'typeorm';

@ValidatorConstraint({
  async: true,
})
export class IsUniqueInDbConstraint implements ValidatorConstraintInterface {
  async validate(
    value: string,
    validationArguments: ValidationArguments,
  ): Promise<boolean> {
    const [repositoryName, entityField] = validationArguments.constraints;

    const isUserExists = await getConnection()
      .getRepository(repositoryName)
      .findOne({
        [entityField]: value,
      });

    return isUserExists === undefined;
  }
}

export const IsUniqueRecord =
  (
    entityName: string,
    entityField: string,
    validationOptions?: ValidationOptions,
  ) =>
  (object, propertyName: string) => {
    registerDecorator({
      target: object.constructor,
      propertyName,
      options: validationOptions,
      constraints: [entityName, entityField],
      async: true,
      validator: IsUniqueInDbConstraint,
    });
  };
