import { BadRequestException, ConflictException, Injectable, InternalServerErrorException } from "@nestjs/common";
import { ApplyDto } from "./dto/apply.dto";
import { Recruit } from "./recruit.schema";
import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";
import { ServiceSettingsService } from "../service-settings/service-settings.service";
import { ServiceSettings } from "../service-settings/schema/service-settings.schema";
import { isAfter, isBefore } from "date-fns";

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
      if (error.code === 11000) // 학번 중복 오류 발생 시
        throw new ConflictException('Already applied');
      else
        throw new InternalServerErrorException();
    }
  }

  // findAll : 모든 지원자 조회


  // findOne : id를 기준으로 특정 지원자 조회


  // update : id를 기준으로 특정 지원자 수정


  // remove : id를 기준으로 특정 지원자 삭제


  // isRecruitmentActive : 현재 지원 기간인지 확인
  async isRecruitmentActive(): Promise<void> {
    const now: Date = new Date();

    const recOpenSetting: ServiceSettings = await this.serviceSettingsService.findByKey("REC_OPEN");
    const recCloseSetting: ServiceSettings = await this.serviceSettingsService.findByKey("REC_CLOSE");

    // 현재 시간이 지원 시작 시간 이전이거나 지원 종료 시간 이후인 경우
    if (isBefore(now, recOpenSetting.value) || isAfter(now, recCloseSetting.value))
      throw new BadRequestException('Recruitment is not active');
  }
}
