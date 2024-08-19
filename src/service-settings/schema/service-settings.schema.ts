import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";
import { SettingsEnum } from "../dto/settings.enum";

export type ServiceSettingsDocument = HydratedDocument<ServiceSettings>;

@Schema()
export class ServiceSettings {

  @Prop({ required: true, unique: true, enum: SettingsEnum })
  key: SettingsEnum;

  @Prop({ required: true })
  value: string;

  @Prop({ required: false })
  description?: string;
}

export const ServiceSettingsSchema = SchemaFactory.createForClass(ServiceSettings);
