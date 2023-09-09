import { Controller, Get, UseGuards } from '@nestjs/common';
import { SubscribersService } from './subscribers.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('subscribers')
export class SubscribersController {
    constructor(private subscriberService:SubscribersService){}
    
    @UseGuards(AuthGuard('jwt'))
    @Get()
    async getSubscribers(){
        return this.subscriberService.getSubscribers();
    }

}
