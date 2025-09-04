import { IsEmail, IsNotEmpty } from 'class-validator';
export class CreateMailDto {
  @IsEmail()
  email: string;

  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  description: string;

  @IsNotEmpty()
  institution: string;

  @IsNotEmpty()
  priority: string;

  @IsNotEmpty()
  impact: string;
}
