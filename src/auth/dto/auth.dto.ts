import { IsEmail, IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator";

export class AuthDto{
    @IsEmail()
    @IsNotEmpty()
    @IsString()
    email: string;

    @IsString()
    @MinLength(3,{message: 'password incorrect'})
    @MaxLength(8,{message: "password incorrect"})
    password: string
}