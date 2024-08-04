import { Module } from '@nestjs/common';
import { RecruitModule } from './recruit/recruit.module';
import { MongooseModule } from "@nestjs/mongoose";
import { FormModule } from './form/form.module';
import { ServiceSettingsModule } from './service-settings/service-settings.module';
import * as config from 'config';

@Module({
  imports: [
    MongooseModule.forRoot(config.get('db').uri),
    RecruitModule,
    FormModule,
    ServiceSettingsModule,
  ],
})
export class AppModule {}
