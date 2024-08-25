import {
  BadRequestException, ConflictException,
  Injectable,
  InternalServerErrorException,
  Logger, NotFoundException
} from "@nestjs/common";
import { ApplyDto } from "./dto/apply.dto";
import { Recruit } from "./schema/recruit.schema";
import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";
import { ServiceSettingsService } from "../service-settings/service-settings.service";
import { ServiceSettings } from "../service-settings/schema/service-settings.schema";
import { isAfter, isBefore } from "date-fns";
import { ApplyResultDto } from "./dto/result.dto";
import { ResultCheckDto } from "./dto/result-check.dto";
import { ServiceSettingsDto } from "../service-settings/dto/service-settings.dto";

@Injectable()
export class RecruitService {
  constructor(
    @InjectModel(Recruit.name) private recruitModel: Model<Recruit>,
    private serviceSettingsService: ServiceSettingsService
  ) {}

  // apply : 신규 지원자 등록
  async apply(applyDto: ApplyDto): Promise<Recruit> {
    await this.isRecruitmentActive(); // 지원 기간이 아닌 경우 예외 발생 (400)
    const application = new this.recruitModel(applyDto);
    try {
      return await application.save();
    } catch (error) {
      if (error.code === 11000) {
        new Logger().log(`Error while creating new application - studentId: ${ application.studentId } Duplicated`);
        throw new ConflictException('Already applied');
      } else {
        new Logger().log('Error while creating new application - Internal Server Error');
        throw new InternalServerErrorException();
      }
    }
  }

  // findAll : 모든 지원자 조회
  async findAll(): Promise<Recruit[]> {
    const applicants: Recruit[] = await this.recruitModel.find().exec();
    if (!applicants) throw new NotFoundException();
    applicants.forEach((recruit) => {
      recruit.applyDate = this.serviceSettingsService.convertUtcDateToKst(recruit.applyDate);
    });
    return applicants;
  }

  // findOne : id를 기준으로 특정 지원자 조회
  async findOne(applyId: number): Promise<Recruit> {
    const result = await this.recruitModel.findOne({ applyId }).exec();
    if (!result) throw new NotFoundException();
    return result;
  }

  // update : id를 기준으로 특정 지원자 수정
  async update(applyId: number, updateDto: ApplyDto): Promise<Recruit> {
    const result = await this.recruitModel.findOneAndUpdate({ applyId }, updateDto, { new: true }).exec();
    if (!result) throw new NotFoundException();
    return result;
  }

  
  // remove : id를 기준으로 특정 지원자 삭제
  async remove(applyId: number): Promise<number> {
    const result = await this.recruitModel.findOneAndDelete({ applyId }).exec();
    if (!result) throw new NotFoundException();
    return applyId;
  }

  // isRecruitmentActive : 현재 지원 기간인지 확인
  async isRecruitmentActive(): Promise<void> {
    const now: Date = new Date();

    const recOpenSetting: ServiceSettings = await this.serviceSettingsService.findByKey("REC_OPEN");
    const recCloseSetting: ServiceSettings = await this.serviceSettingsService.findByKey("REC_CLOSE");

    // 현재 시간이 지원 시작 시간 이전이거나 지원 종료 시간 이후인 경우
    if (isBefore(now, recOpenSetting.value) || isAfter(now, recCloseSetting.value))
      throw new BadRequestException('Recruitment is not active');
  }

  // firstPass : 1차 합불 처리
  async firstPass(applyId: number, pass: boolean): Promise<Recruit> {
    const result = await this.recruitModel.findOneAndUpdate({ applyId }, { firstPass: pass }, { new: true }).exec();
    if (!result) throw new NotFoundException();
    return result;
  }

  // secondPass : 2차 합불 처리
  async secondPass(applyId: number, pass: boolean): Promise<Recruit> {
    const result = await this.recruitModel.findOneAndUpdate({ applyId }, { secondPass: pass }, { new: true }).exec();
    if (!result) throw new NotFoundException();
    return result;
  }

  // checkRecruitResult : 합격자 조회
  async checkApplyResult({ checkType, studentId, contactLastDigit }: ResultCheckDto): Promise<ApplyResultDto> {
    const applicant: Recruit = await this.recruitModel.findOne({ studentId }).exec();

    // 지원자가 존재하지 않는 경우
    if (!applicant)
      throw new NotFoundException(`No such applicant found with studentId: ${ studentId }`);

    // 지원자의 연락처 뒷자리와 입력된 연락처 뒷자리가 일치하지 않는 경우
    if (contactLastDigit.toString() !== applicant.applicantContact.substring(9, 13))
      throw new BadRequestException(`Invalid contact number of ${ studentId }`);

    const isPassed = checkType === 'FIRST_PASS' ? applicant.firstPass : applicant.secondPass;

    return ApplyResultDto.create(applicant.studentId, applicant.applicantName, checkType, !!isPassed);
  }

  // getRecruitSchedule : 모집 일정 조회 (지원자용)
  async getRecruitSchedule(): Promise<ServiceSettingsDto[]> {
    const serviceSettings: ServiceSettings[] = await this.serviceSettingsService.findAll();
    return serviceSettings.map((setting) => {
      return {
        key: setting.key,
        value: this.serviceSettingsService.convertUtcDateToKst(setting.value)
      };
    });
  }
}
