import { IsEnum, IsString, Length, Matches } from "class-validator";

export enum CheckTypeEnum {
  FIRST_PASS = 'FIRST_PASS',
  SECOND_PASS = 'SECOND_PASS',
}

export class ResultCheckDto {
  @IsEnum(CheckTypeEnum)
  @IsString()
  checkType: CheckTypeEnum;

  @IsString()
  @Length(8, 8)
  @Matches(/^[1-9]\d*$/, { message: 'studentId must not start with 0' })
  studentId: string;

  @IsString()
  @Length(4, 4)
  contactLastDigit: string;
}
