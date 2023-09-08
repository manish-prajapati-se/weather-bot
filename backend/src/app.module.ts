import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { WeatherModule } from './weather/weather.module';
import { WeatherService } from './weather/weather.service';
import { TelegramService } from './telegram/telegram.service';
import { AuthModule } from './auth/auth.module';
import { ConfigureModule } from './configure/configure.module';
import { SubscribersModule } from './subscribers/subscribers.module';

@Module({
  controllers: [AppController],
  providers: [AppService,WeatherService,TelegramService],
  imports: [AuthModule,WeatherModule, ConfigureModule, SubscribersModule],
})
export class AppModule {}
