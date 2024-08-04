import { AuthDto } from "./dto";
import { PrismaService } from "src/prisma/prisma.service";
import { JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";
export declare class AuthService {
    private readonly prisma;
    private readonly jwt;
    private readonly config;
    constructor(prisma: PrismaService, jwt: JwtService, config: ConfigService);
    signUp(dto: AuthDto): Promise<{
        accessToken: string;
    }>;
    signIn(dto: AuthDto): Promise<{
        accessToken: string;
    }>;
    signToken(userId: number, email: string): Promise<{
        accessToken: string;
    }>;
}
