import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsOptional, IsString } from 'class-validator';

export class UpdateUserProfileDTO {
  @ApiProperty({ example: 'Jane', description: 'First name of the user', required: false })
  @IsString()
  @IsOptional()
  firstName: string;

  @ApiProperty({ example: 'Doe', description: 'Last name of the user', required: false })
  @IsString()
  @IsOptional()
  lastName: string;

  @ApiProperty({ example: 'jane.doe@example.com', description: 'Email address of the user', required: false })
  @IsEmail()
  @IsOptional()
  email: string;

  @ApiProperty({ example: 'strongPassword123', description: 'Password of the user', required: false })
  @IsString()
  @IsOptional()
  password: string;
}
