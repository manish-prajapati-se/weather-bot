import { Injectable } from '@nestjs/common';
import axios from 'axios';
import * as TelegramBot from 'node-telegram-bot-api';
require('dotenv').config();
import * as fs from 'fs';

process.on('unhandledRejection', (reason, promise) => {
    console.error('Unhandled Rejection at:', promise, 'reason:', reason);
    // You can add additional error handling or logging here.
});

@Injectable()
export class TelegramService {
    private userDataPath='/home/manish/weather-bot/backend/src/telegram/user-data.json';
    private subscribersPath='/home/manish/weather-bot/backend/src/telegram/subscribers.json'
    private API_KEY=process.env.OPEN_WEATHER_API_TOKEN;

    constructor(){
        const bot=new TelegramBot(process.env.TELEGRAM_TOKEN,{polling:true});
        
        
        bot.on('message',async (message)=>{
            // console.log(message.chat.id);
            const chatId=message.chat.id;
            if(message.text=='/start'){
                this.addUser(bot,chatId);
                // this.sendWeatherAlert(bot,chatId);
                bot.sendMessage(chatId,"Please enter your location: ");
            }else if(message.text=='/help'){
                this.sendHelpMessage(bot,chatId);
            }else if(message.text=='/stop'){
                this.removeUser(bot,chatId)
            }else this.setLocation(bot,chatId,message.text);
            
            
        })
        
        setInterval(()=>{
            console.log('hello');
            this.sendWeatherAlertToAll(bot);
        }   ,600000);
        
    }
    async addUser(bot,userId){
        const userData=await fs.readFileSync(this.userDataPath,'utf8');
        let users=JSON.parse(userData);
        
        const userInfo=await this.getUserInfo(bot,userId);
        userInfo.chatContext=1;

        users[userId]=userInfo;
        console.log(userInfo);

        console.log(users);
        fs.writeFileSync(this.userDataPath,JSON.stringify(users,null,2));    

    }

    async getUserInfo(bot,userId){
        const data=await bot.getChat(userId);
        const file=await bot.getFile(data.photo.small_file_id);
        console.log(file);
        const userInfo={
            firstName:data.first_name,
            lastName:data.last_name,
            profilePictureURL:`https://api.telegram.org/file/bot${process.env.TELEGRAM_TOKEN}/${file.file_path}`,
            chatContext:0,
            location:""
        }

        return userInfo;
    }

    async sendHelpMessage(bot,chatId){
        const helpMessage = `
        Hello! I am your weather bot.
- send */location* to change location
- send */stop* to stop weather alert
- send */help* to repeat this message
        `
        await bot.sendMessage(chatId,helpMessage,{parse_mode:'markdown'})
    }

    async sendWeatherAlert(bot,chatId,location){

        const apiURL=`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${this.API_KEY}`;
        const response=await axios.get(apiURL);
        // console.log(response.data);
        const weather=response.data;
        const weatherData={
            location:weather.name,
            description: weather.weather[0].description,
            temperature: weather.main.temp/10,
            humidity: weather.main.humidity,
            pressure: weather.main.pressure,
            windSpeed: weather.wind.speed,
            visibility: weather.visibility,
            windDirection: weather.wind.deg
        }
        console.log(weatherData);
        const configPath='/home/manish/weather-bot/backend/src/configure/bot-config.json';
        const configFile=fs.readFileSync(configPath,'utf8');
        const config=JSON.parse(configFile);

        let customizedWeather="";
        if(config["location"].isIncluded) customizedWeather+=`*Location*📍: ${weatherData.location}\n`
        if(config["description"].isIncluded) customizedWeather+=`*Description*: ${weatherData.description}\n`
        if(config["temperature"].isIncluded) customizedWeather+=`*Temperature* 🌡: ${weatherData.temperature}°C\n`
        if(config["humidity"].isIncluded) customizedWeather+=`*Humidity* 🧖: ${weatherData.humidity}%\n`
        if(config["pressure"].isIncluded) customizedWeather+=`*Pressure*: ${weatherData.pressure} hPa\n`
        if(config["windSpeed"].isIncluded) customizedWeather+=`*Wind Speed* 🍃: ${weatherData.windSpeed} m/s\n`
        if(config["visibility"].isIncluded) customizedWeather+=`*Visibility* 👁: ${weatherData.visibility} meters\n`
        if(config["windDirection"].isIncluded) customizedWeather+=`*Wind Direction* 🍃: ${weatherData.windDirection} degrees\n`

        const weatherString = `
        *Location*📍: ${weatherData.location}
*Description*: ${weatherData.description}
*Temperature* 🌡: ${weatherData.temperature} °C
*Humidity* 🧖: ${weatherData.humidity}%
*Pressure*: ${weatherData.pressure} hPa
*Wind Speed* 🍃: ${weatherData.windSpeed} m/s
*Visibility* 👁: ${weatherData.visibility} meters
*Wind Direction* 🍃: ${weatherData.windDirection} degrees
        `;        


        bot.sendMessage(chatId,customizedWeather,{ parse_mode: 'markdown' })
    }

    async sendWeatherAlertToAll(bot){
        const subscribersData=fs.readFileSync(this.subscribersPath,'utf8');
        let subscribers=JSON.parse(subscribersData);

        const userData=fs.readFileSync(this.userDataPath,'utf8');
        let users=JSON.parse(userData);
        console.log('weather alert')
        console.log(subscribers);
        for(const subscriber of subscribers){
            console.log('alert sent to ',subscriber);
            const location=users[subscriber].location;
            this.sendWeatherAlert(bot,subscriber,location);
        }

    }


    async removeUser(bot,chatId){
        const userData=fs.readFileSync(this.userDataPath,'utf8');
        let users=JSON.parse(userData);
        delete users[chatId];
        fs.writeFileSync(this.userDataPath,JSON.stringify(users,null,2));

        const subscribersData=fs.readFileSync(this.subscribersPath,'utf8');
        let subscribers=JSON.parse(subscribersData);
        const subscribersNew=subscribers.filter((element)=>element!=chatId);
        fs.writeFileSync(this.subscribersPath,JSON.stringify(subscribersNew));
    
        bot.sendMessage(chatId,'You will no longer receive weather alerts.');
    }


    async setLocation(bot,chatId,location){
        if(location=='/location') return bot.sendMessage(chatId,"Please enter your location: ");
        const userData=fs.readFileSync(this.userDataPath,'utf8');
        let users=JSON.parse(userData);
        const user=users[chatId];

        const apiURL=`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${this.API_KEY}`;
        
        try{
            const response=await axios.get(apiURL);
            console.log('1');
            users[chatId].location=location;
            fs.writeFileSync(this.userDataPath,JSON.stringify(users,null,2));

            const subscribersData=fs.readFileSync(this.subscribersPath,'utf8');
            let subscribers=JSON.parse(subscribersData);
            if(!subscribers.includes(chatId)) subscribers.push(chatId);
            fs.writeFileSync(this.subscribersPath,JSON.stringify(subscribers));

            bot.sendMessage(chatId,"Weather alert has been set.");

        }catch(error){
            console.log('error occured');
            await bot.sendMessage(chatId,'Please enter a valid location!!')
        }

    }

}
