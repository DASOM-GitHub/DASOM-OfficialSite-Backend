import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger, NotFoundException
} from "@nestjs/common";
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
      new Logger().log('Error while creating new application');
      throw new InternalServerErrorException();
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
    const result = await this.recruitModel.findOneAndUpdate({ applyId }, updateDto).exec();
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

  // pass : 합불 처리
  async pass(applyId: number, pass: boolean): Promise<Recruit> {
    const result = await this.recruitModel.findOneAndUpdate({ applyId }, { isPass: pass }).exec();
    if (!result) throw new NotFoundException();
    return result;
  }
}
