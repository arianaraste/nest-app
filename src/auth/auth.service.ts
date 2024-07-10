import { ForbiddenException, Injectable } from "@nestjs/common";
import { AuthDto } from "./dto";
import * as argon from "argon2"
import { PrismaService } from "src/prisma/prisma.service";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";
@Injectable()
export class AuthService {
    constructor( 
        private readonly prisma: PrismaService,
        private readonly jwt: JwtService,
        private readonly config: ConfigService
    ){}
    async signUp(dto:AuthDto){
        try {
            // create hash
            const hash = await argon.hash(dto.password)
            // save user on db
            const user = await this.prisma.users.create({
            data:{
                email: dto.email,
                hash: hash
            }})
            // return user  
            delete user.hash
            return user
        } catch (error) {
            if( error instanceof PrismaClientKnownRequestError){
                if( error.code === "P2002")
                    throw new ForbiddenException(
                        'Credentials taken'
                )
            }
            throw error
        }
    }
    
    async signIn(dto: AuthDto){
        try {
        // find user
        const user =
        await this.prisma.users.findUnique(
           {
               where: {
                   email: dto.email
               }
           }
       )
      // if user does not exist throw exeption
      if(!user)
           throw new ForbiddenException(
               'Credentials incorrect'
       )
      // compare password
        const verifyPassword =
            await argon.verify(
                user.hash,
                dto.password
            );
      // if password incorrect throw exeption
      if(!verifyPassword)
           throw new ForbiddenException(
               'Credentials incorrect'
       )
      // return user
      delete user.hash;
      delete user.id
      return this.signToken(user.id,user.email)
        } catch (error) {
            throw error
        }
    }
    async signToken(
        userId: number,
        email: string
    ):Promise<String>{
        // inject paylodd
        const payload =
             {
                sub: userId,
                email
            };

        //return jwt
        return this.jwt.signAsync(payload,{
            secret: this.config.get('SECRET')
        })
    }
}