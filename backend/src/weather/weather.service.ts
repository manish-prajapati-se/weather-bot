import { Injectable } from '@nestjs/common';
import axios from 'axios';
require('dotenv').config();

@Injectable()
export class WeatherService {
    constructor(){
        this.getWeather('London');
    }
    async getWeather(city:string):Promise<any>{
        const API_KEY=process.env.OPEN_WEATHER_API_TOKEN;
        const apiURL=`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`;
        // const response=await axios.get(apiURL);
        // console.log(response.data);
        // return response.data;
    }
}

