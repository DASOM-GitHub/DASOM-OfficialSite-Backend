import { Module } from '@nestjs/common';
import { ServiceSettingsController } from './service-settings.controller';
import { ServiceSettingsService } from './service-settings.service';
import { ServiceSettings, ServiceSettingsSchema } from "./schema/service-settings.schema";
import { MongooseModule } from "@nestjs/mongoose";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: ServiceSettings.name, schema: ServiceSettingsSchema}]),
  ],
  controllers: [ServiceSettingsController],
  providers: [ServiceSettingsService],
  exports: [ServiceSettingsService]
})
export class ServiceSettingsModule {}
