import { DepartmentType } from "./dto/department.type";
import { HydratedDocument } from "mongoose";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

export type RecruitDocument = HydratedDocument<Recruit>;

@Schema()
export class Recruit {

  @Prop({ unique: true })
  applyId: number;

  @Prop({ unique: true })
  studentId: number;

  @Prop({ required: true })
  applicantName: string;

  @Prop({ required: true })
  applicantEmail: string;

  @Prop({ required: true })
  applicantContact: string;

  @Prop({ required: true })
  applicantDept: DepartmentType;

  @Prop({ required: true })
  applicantGrade: number;

  @Prop({ required: true })
  reasonForApply: string;

  @Prop({ default: () => new Date() })
  applyDate: Date;
}

export const RecruitSchema = SchemaFactory.createForClass(Recruit)
