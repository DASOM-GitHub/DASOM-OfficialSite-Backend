import { DepartmentEnum } from "./department.enum";
import { IsEmail, IsEnum, IsNumber, IsString, Length, Max, MaxLength, Min } from "class-validator";

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

  @IsEnum(DepartmentEnum)
  @IsString()
  applicantDept: DepartmentEnum;

  @IsNumber()
  @Min(1)
  @Max(4)
  applicantGrade: number;

  @IsString()
  @MaxLength(200)
  reasonForApply: string;
}
