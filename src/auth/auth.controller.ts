import { Body, Controller, Get, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthDto } from "./dto";

@Controller('auth')
export class AuthController{
    constructor(private readonly AuthService: AuthService){}

    @Post("signup")
    signUp(@Body() dto : AuthDto){
        return this.AuthService.signUp(dto);
    }
    
    @Post("signin")
    signIn(@Body() dto: AuthDto){        
        return this.AuthService.signIn(dto);
    }
} 