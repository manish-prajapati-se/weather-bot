import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { ConfigureService } from './configure.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('configure')
export class ConfigureController {
    constructor(private configureService:ConfigureService){}

    @UseGuards(AuthGuard('jwt'))
    @Get()
    getBotConfiguration(@Body() body:any){
        return this.configureService.getBotConfiguration();
    }

    @UseGuards(AuthGuard('jwt'))
    @Post()
    async saveBotConfiguration(@Body() body:any):Promise<void>{
        await this.configureService.saveBotConfiguration(body);
    }
}
