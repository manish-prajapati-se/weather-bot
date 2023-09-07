import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { WeatherModule } from './weather/weather.module';
import { WeatherService } from './weather/weather.service';
import { TelegramService } from './telegram/telegram.service';
import { AuthModule } from './auth/auth.module';
import { ConfigureModule } from './configure/configure.module';

@Module({
  controllers: [AppController],
  providers: [AppService,WeatherService],
  imports: [AuthModule,WeatherModule, ConfigureModule],
})
export class AppModule {}
