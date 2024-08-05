import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type ServiceSettingsDocument = HydratedDocument<ServiceSettings>;

@Schema()
export class ServiceSettings {

  @Prop({ required: true, unique: true })
  key: string;

  @Prop({ required: true })
  value: string;

  @Prop({ required: false })
  description?: string;
}

export const ServiceSettingsSchema = SchemaFactory.createForClass(ServiceSettings);
