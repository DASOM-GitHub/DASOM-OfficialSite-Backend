import { DepartmentType } from "./department.type";
import { IsEmail, IsNumber, IsString, Length, Max, MaxLength, Min } from "class-validator";

export class ApplyDto {
  @Length(8, 8)
  studentId: number;

  @IsString()
  applicantName: string;

  @IsEmail()
  applicantEmail: string;

  @IsString()
  @Length(13, 13)
  applicantContact: string;

  @IsString()
  applicantDept: DepartmentType;

  @IsNumber()
  @Min(1)
  @Max(4)
  applicantGrade: number;

  @IsString()
  @MaxLength(200)
  reasonForApply: string;
}
