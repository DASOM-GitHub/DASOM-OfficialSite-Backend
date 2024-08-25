import { IsBoolean, IsEnum, IsString, Length } from "class-validator";
import { CheckTypeEnum } from "./result-check.dto";

export class ApplyResultDto {
  private constructor(studentId: string, applicantName: string, checkType: CheckTypeEnum, isApplicantPassed: boolean, etc?: string) {
    this.studentId = studentId;
    this.applicantName = applicantName;
    this.checkType = checkType;
    this.isApplicantPassed = isApplicantPassed;
    this.etc = etc;
  }

  @Length(8, 8)
  studentId: string;

  @IsString()
  applicantName: string;

  @IsEnum(CheckTypeEnum)
  checkType: CheckTypeEnum;

  @IsBoolean()
  isApplicantPassed: boolean;

  @IsString()
  etc?: string;

  static create(studentId: string, applicantName: string, checkType: CheckTypeEnum, isApplicantPassed: boolean, etc? : string): ApplyResultDto {
    return new ApplyResultDto(studentId, applicantName, checkType, isApplicantPassed, etc);
  }
}
