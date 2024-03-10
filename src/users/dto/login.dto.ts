import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({ example: 'admin', description: 'The username of the user' })
  readonly username: string;

  @ApiProperty({
    example: 'adminPassword',
    description: 'The password of the user',
  })
  readonly password: string;
}
