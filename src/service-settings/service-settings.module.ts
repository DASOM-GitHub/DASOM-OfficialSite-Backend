import { Module } from '@nestjs/common';
import { ServiceSettingsController } from './service-settings.controller';
import { ServiceSettingsService } from './service-settings.service';
import { ServiceSettings, ServiceSettingsSchema } from "./schema/service-settings.schema";
import { MongooseModule } from "@nestjs/mongoose";
import { ServiceInfo, ServiceInfoSchema } from "./schema/service-info.schema";

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: ServiceSettings.name, schema: ServiceSettingsSchema},
      { name: ServiceInfo.name, schema: ServiceInfoSchema }
    ]),
  ],
  controllers: [ServiceSettingsController],
  providers: [ServiceSettingsService],
  exports: [ServiceSettingsService]
})
export class ServiceSettingsModule {}
