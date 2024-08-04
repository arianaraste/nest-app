import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { validate } from "class-validator";
import { paylod } from "src/types";
import { PrismaService } from "src/prisma/prisma.service";
import { log } from "console";
@Injectable()
export class JwtStrategy extends PassportStrategy(
    Strategy
) {
    constructor(
        config: ConfigService,
        private prisma: PrismaService
    ) {
        super({
            jwtFromRequest:  
            ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey:  config.get('SECRET') ,
        });
    }
    async validate(payload: paylod){
        // find user by paylod.sub
        const user =
         await this.prisma.users.findUnique({
            where: {
                id: payload.sub
            }
         })
        // delete user.hash
        delete user.hash;
        // if user is null throw 401 => unauthorize else return user
        console.log(payload);
        console.log(user);
        
        
        return user
    }

}