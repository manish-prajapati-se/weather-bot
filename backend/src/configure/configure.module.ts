import { Module } from '@nestjs/common';
import { ConfigureController } from './configure.controller';
import { ConfigureService } from './configure.service';

@Module({
  controllers: [ConfigureController],
  providers: [ConfigureService]
})
export class ConfigureModule {}
