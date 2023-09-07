import { Body, Controller, Get, Post } from '@nestjs/common';
import { WeatherService } from './weather.service';

@Controller('weather')
export class WeatherController {
    constructor(private readonly weatherService:WeatherService){}

    @Get()
    getWeather(){
        return this.weatherService.getWeather('London');
    }

}
