import { IsEnum, IsOptional, IsString, Length } from "class-validator";

export enum ServiceInfoEnum {
  REC_INTERVIEW_APPLY = 'REC_INTERVIEW_APPLY', // 면접 일정 지원 URL
}

export class ServiceInfoDto {
  @IsEnum(ServiceInfoEnum)
  @IsString()
  @Length(4, 20)
  key: ServiceInfoEnum;

  @IsString()
  value: string;

  @IsOptional()
  @IsString()
  description?: string;
}
