import { ApiProperty } from '@nestjs/swagger';

export class OAuth2PasswordRequestFormDto {
  @ApiProperty({
    example: 'password',
    default: 'password',
    description: 'Grant type (wajib: password)',
    required: true,
  })
  grant_type: string = 'password';

  @ApiProperty({
    example: 'user1',
    description: 'Username',
    required: true,
  })
  username: string;

  @ApiProperty({
    example: 'password123',
    description: 'Password',
    required: true,
  })
  password: string;

  @ApiProperty({
    example: '',
    description: 'Scope (opsional)',
    required: false,
    default: '',
  })
  scope?: string = '';

  @ApiProperty({
    example: 'string',
    description: 'Client ID (opsional)',
    required: false,
    default: 'string',
  })
  client_id?: string = 'string';

  @ApiProperty({
    example: 'string',
    description: 'Client Secret (opsional)',
    required: false,
    default: 'string',
  })
  client_secret?: string = 'string';
}
