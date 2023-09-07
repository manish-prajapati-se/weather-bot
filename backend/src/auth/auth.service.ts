import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as users from './users.json';
import { AuthDto } from './auth.dto';
import { JwtService } from '@nestjs/jwt';
const jwt=require('jsonwebtoken');

@Injectable()
export class AuthService {
    constructor(private jwtService:JwtService){

    }

    signInLocal(dto: AuthDto){
        const user=users.find(_user=>_user.email===dto.email);
        if(!user) throw new UnauthorizedException('Credentials incorrect');
        if(user.password!==dto.password) throw new UnauthorizedException('Credentials incorrect')
        return this.signUser(user.id,user.email,'user');
    }

    verifyLocal(token:string){
    
        console.log(token);
        const user=jwt.verify(token,'super-secret-cat');
        console.log(user);
    }

    signUpLocal(dto: AuthDto){}

    signUser(userId: number,email: string, type:string){
        return this.jwtService.sign({
            sub: userId,
            email,
            type,
        })
    }
}
