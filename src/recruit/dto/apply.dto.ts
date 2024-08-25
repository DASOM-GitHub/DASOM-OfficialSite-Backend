import { DepartmentEnum } from "./department.enum";
import { IsEnum, IsNumber, IsString, Length, Matches, Max, Min } from "class-validator";

export class ApplyDto {
  @IsString()
  @Length(8, 8)
  @Matches(/^[1-9]\d*$/, { message: 'studentId must not start with 0' })
  studentId: string;

  @IsString()
  applicantName: string;

  @IsString()
  @Length(10, 13)
  applicantContact: string;

  @IsEnum(DepartmentEnum)
  @IsString()
  applicantDept: DepartmentEnum;

  @IsNumber()
  @Min(1)
  @Max(4)
  applicantGrade: number;

  @IsString()
  // @MaxLength(200)
  reasonForApply: string;
}
