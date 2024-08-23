import { IsBoolean, IsString, Length } from "class-validator";

export class ApplyResultDto {
  private constructor(studentId: number, applicantName: string, isApplicantPassed: boolean) {
    this.studentId = studentId;
    this.applicantName = applicantName;
    this.isApplicantPassed = isApplicantPassed;
  }

  @Length(8, 8)
  studentId: number;

  @IsString()
  applicantName: string;

  @IsBoolean()
  isApplicantPassed: boolean;

  static create(studentId: number, applicantName: string, isApplicantPassed: boolean): ApplyResultDto {
    return new ApplyResultDto(studentId, applicantName, isApplicantPassed);
  }
}
