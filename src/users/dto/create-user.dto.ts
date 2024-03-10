import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ example: 'lotus', description: 'The username of the user' })
  readonly username: string;

  @ApiProperty({
    example: 'lotusPassword',
    description: 'The password of the user',
  })
  readonly password: string;

  @ApiProperty({ example: 'User', description: 'The role of the user' })
  readonly role?: string;

  @ApiProperty({ example: 'Lotus', description: 'The name of the user' })
  readonly name?: string;
}
