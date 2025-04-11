import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDTO } from './create-user.dto';
import { IsEmail, IsString } from 'class-validator';

export class UpdateUserDTO extends PartialType(CreateUserDTO) {
    @IsString()
    username: string;

    @IsEmail()
    email: string;

    @IsString()
    password: string;   
}
