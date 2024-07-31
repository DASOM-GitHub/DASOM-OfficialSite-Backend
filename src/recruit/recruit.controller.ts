import { Body, Controller, Get, Post } from "@nestjs/common";
import { RecruitService } from "./recruit.service";
import { ApplyDto } from "./dto/apply.dto";
import { Recruit } from "./recruit.schema";

@Controller('recruit')
export class RecruitController {
  constructor(private recruitService: RecruitService) {}

  // apply : 신규 지원자 등록
  @Post()
  apply(@Body() applyDto: ApplyDto): Promise<Recruit> {
    return this.recruitService.apply(applyDto);
  }

  // findAll : 모든 지원자 조회


  // findOne : id를 기준으로 특정 지원자 조회


  // update : id를 기준으로 특정 지원자 수정


  // remove : id를 기준으로 특정 지원자 삭제


}
