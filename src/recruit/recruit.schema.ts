import { DepartmentEnum } from "./dto/department.enum";
import { HydratedDocument } from "mongoose";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

export type RecruitDocument = HydratedDocument<Recruit>;

@Schema()
export class Recruit {

  @Prop({ unique: true })
  applyId: number;

  @Prop({ required: true })
  studentId: number;

  @Prop({ required: true })
  applicantName: string;

  @Prop({ required: true })
  applicantContact: string;

  @Prop({ required: true, enum: DepartmentEnum })
  applicantDept: DepartmentEnum;

  @Prop({ required: true })
  applicantGrade: number;

  @Prop({ required: true })
  reasonForApply: string;

  @Prop({ required: true })
  isPass: boolean; // 합격 여부 (true: 합격, false: 불합격)

  @Prop({ default: () => new Date().toISOString() })
  applyDate: string;
}

export const RecruitSchema = SchemaFactory.createForClass(Recruit)
