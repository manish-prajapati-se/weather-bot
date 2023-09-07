import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { WeatherModule } from './weather/weather.module';
import * as cors from 'cors';

const TelegramBot=require('node-telegram-bot-api');
require('dotenv').config();
import axios from 'axios';

async function bootstrap() {
  
  
  // const bot=new TelegramBot(process.env.TELEGRAM_TOKEN,{polling:true});
  // const city='London';
  // const apiURL=`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.OPEN_WEATHER_API_TOKEN}`
  // const response=await axios.get(apiURL);
  // console.log(response.data);
  // // console.dir(bot);
  
  // bot.on('message',(message)=>{
  //   console.log(message);
  //   const chatId=message.chat.id;
  //   const response={

  //   }
  //   bot.sendMessage(chatId,message.text);
  // })

  // const chat=await bot.getChatHistory('5251618924');
  // console.log(chat);
  console.log('hello');
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  await app.listen(5000);
}
bootstrap();
