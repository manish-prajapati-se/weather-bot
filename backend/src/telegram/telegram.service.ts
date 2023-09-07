import { Injectable } from '@nestjs/common';
import * as TelegramBot from 'node-telegram-bot-api';
require('dotenv').config();

@Injectable()
export class TelegramService {
    constructor(){
        const bot=new TelegramBot(process.env.TELEGRAM_TOKEN,{polling:true});
        const API_KEY=process.env.OPEN_WEATHER_API_TOKEN;
        bot.on('message',async (message)=>{
            // console.log(message);
            const chatID=message.chat.id;
            const messageText=message.text;
            
            if(messageText=='/city'){
                await bot.sendMessage(chatID,'Enter your city:');
                const city='London';
                const apiURL=`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`;
            }else if(messageText=='/frequency'){
                await bot.sendMessage(chatID,'Enter your frequency');
            }

        })
    }
}
