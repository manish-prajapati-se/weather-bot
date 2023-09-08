import { Body, Injectable } from '@nestjs/common';
import botConfig from './bot-config.json';
import * as fs from 'fs';

@Injectable()
export class ConfigureService {
    private configData: any;
    private absoluteFilePath:string;

    constructor() {
      this.absoluteFilePath='/home/manish/weather-bot/backend/src/configure/bot-config.json';
    }

    getBotConfiguration(){
      try {
        const configFile =  fs.readFileSync(this.absoluteFilePath, 'utf8');
        console.log(configFile);
        this.configData = JSON.parse(configFile);

      } catch (error) {

        throw new Error('Unable to load configuration data');
      }
      console.log('bot-config',this.configData);
      return this.configData;
    }

    async saveBotConfiguration(body: any):Promise<void>{
        console.log('body',body);
        try {
            fs.writeFileSync(this.absoluteFilePath,JSON.stringify(body,null,2));
            console.log('configuration saved');
          } catch (error) {
            throw new Error('Unable to save configuration data');
        }
    }
 
}
