import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";
import { ServiceInfoEnum } from "../dto/service-info.dto";

export type ServiceInfoDocument = HydratedDocument<ServiceInfo>;

@Schema()
export class ServiceInfo {
  @Prop({ required: true, unique: true, enum: ServiceInfoEnum })
  key: ServiceInfoEnum;

  @Prop({ required: true })
  value: string;

  @Prop({ required: false })
  description?: string;
}

export const ServiceInfoSchema = SchemaFactory.createForClass(ServiceInfo);
