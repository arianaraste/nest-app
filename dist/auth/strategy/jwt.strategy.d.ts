import { Strategy } from "passport-jwt";
import { ConfigService } from "@nestjs/config";
import { paylod } from "src/types";
import { PrismaService } from "src/prisma/prisma.service";
declare const JwtStrategy_base: new (...args: any[]) => InstanceType<typeof Strategy>;
export declare class JwtStrategy extends JwtStrategy_base {
    private prisma;
    constructor(config: ConfigService, prisma: PrismaService);
    validate(payload: paylod): Promise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        email: string;
        hash: string;
        first_name: string | null;
        last_name: string | null;
    }>;
}
export {};
