import {
  IsEmail,
  IsNotEmpty,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { IsUniqueRecord } from '../../../common/decorators/uniq-record.decorator';
import { UserLoginDto } from './user.login.dto';

export class UserRegisterDto extends UserLoginDto {
  @ApiProperty({
    example: 'test@gmail.com',
    description: 'user email',
    required: true,
  })
  @IsUniqueRecord('user', 'email', { message: '$value already exists' })
  @IsEmail()
  email: string;

  @ApiProperty({
    example: '123qwe!WE',
    description: 'user password',
    required: true,
  })
  @IsNotEmpty()
  @MinLength(8)
  @MaxLength(30)
  @Matches(
    /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&amp;*()_+}{&quot;:;'?/&gt;.&lt;,])(?!.*\s).*$/,
    {
      message:
        'password too weak, password must contain at least 8 characters in length, ' +
        'contain: lower case letters, upper case letters, numbers and special characters',
    },
  )
  password: string;
}
