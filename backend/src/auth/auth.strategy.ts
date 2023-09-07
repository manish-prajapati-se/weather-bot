import { Injectable } from "@nestjs/common";
import {PassportStrategy} from '@nestjs/passport';
import { ExtractJwt, Strategy } from "passport-jwt";

//use strategies to protect routes
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy,'jwt'){
    
    constructor() {
        super({
          jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), 
          //take the jwt from the header and decode it and put that in a variable 'payload'

          ignoreExpiration: true,
          secretOrKey: 'super-secret-cat',
        });
      }
    
      async validate(payload: any) {
        //receives payload part of JWT as argument
        console.log('validate()',payload);
        return payload;
      }
}