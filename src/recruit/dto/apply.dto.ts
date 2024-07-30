import { DepartmentType } from "./department.type";

export class ApplyDto {
  studentId: number;
  applicantName: string;
  applicantEmail: string;
  applicantContact: string;
  applicantDept: DepartmentType;
  applicantGrade: number;
  reasonForApply: string;
}
