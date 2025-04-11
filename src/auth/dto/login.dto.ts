import { PartialType } from '@nestjs/mapped-types';
import { SignUpDTO } from './sign-up.dto';
import { IsEmail, IsString } from 'class-validator';

export class LoginDTO extends PartialType(SignUpDTO) {

    @IsEmail()
    email: string;

    @IsString()
    password: string;
}
