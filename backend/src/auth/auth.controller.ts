import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import {AuthDto} from './auth.dto';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService){}

    @Post('local/signin')
    signInLocal(@Body() dto:AuthDto){
        return this.authService.signInLocal(dto);
    }

    @Post('local/signup')
    signUpLocal(@Body() dto:AuthDto){
        return this.authService.signUpLocal(dto); 
    }

    @Post('local/verify')
    verifyLocal(@Body() body:any){
        return this.authService.verifyLocal(body.token);
    }

}
