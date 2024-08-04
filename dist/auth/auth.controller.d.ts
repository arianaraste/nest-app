import { AuthService } from "./auth.service";
import { AuthDto } from "./dto";
export declare class AuthController {
    private readonly AuthService;
    constructor(AuthService: AuthService);
    signUp(dto: AuthDto): Promise<{
        accessToken: string;
    }>;
    signIn(dto: AuthDto): Promise<{
        accessToken: string;
    }>;
}
