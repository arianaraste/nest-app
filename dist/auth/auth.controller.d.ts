import { AuthService } from "./auth.service";
import { AuthDto } from "./dto";
export declare class AuthController {
    private readonly AuthService;
    constructor(AuthService: AuthService);
    signUp(dto: AuthDto): Promise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        email: string;
        hash: string;
        first_name: string | null;
        last_name: string | null;
    }>;
    signIn(dto: AuthDto): Promise<String>;
}
