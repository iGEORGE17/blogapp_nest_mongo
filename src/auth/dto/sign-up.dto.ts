import { IsString, IsEmail } from "class-validator";

export class SignUpDTO {
    @IsString()
    username: string;

    @IsEmail()
    email: string;

    @IsString()
    password: string;    
}
