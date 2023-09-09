import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import { stringify } from 'querystring';

@Injectable()
export class SubscribersService {
    private userDataPath='/home/manish/weather-bot/backend/src/telegram/user-data.json';
    private subscribersPath='/home/manish/weather-bot/backend/src/telegram/subscribers.json'

    getSubscribers(){
        const subscribersData=fs.readFileSync(this.subscribersPath,'utf8');
        const subscribers=JSON.parse(subscribersData);

        let response={};
        const usersData=fs.readFileSync(this.userDataPath,'utf8');
        const users=JSON.parse(usersData);
        for(const subscriber of subscribers){  
            response[subscriber]=users[subscriber];
        }
        return response;
    }
}
