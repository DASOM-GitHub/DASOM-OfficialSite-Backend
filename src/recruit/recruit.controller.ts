import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from "@nestjs/common";
import { RecruitService } from "./recruit.service";
import { ApplyDto } from "./dto/apply.dto";
import { Recruit } from "./schema/recruit.schema";
import { JwtAuthGuard } from "../auth/jwt/jwt.guard";
import { ApplyResultDto } from "./dto/result.dto";

@Controller('recruit')
export class RecruitController {
  constructor(private recruitService: RecruitService) {}

  // apply : 신규 지원자 등록
  @Post()
  apply(@Body() applyDto: ApplyDto): Promise<Recruit> {
    return this.recruitService.apply(applyDto);
  }

  // checkApplyResult : 합격 조회
  @Get('result')
  checkApplyResult(@Body('studentId') studentId: number,
                   @Body('contactLastDigit') contactLastDigit: number): Promise<ApplyResultDto> {
    return this.recruitService.checkApplyResult(studentId, contactLastDigit);
  }

  // findAll : 모든 지원자 조회
  @UseGuards(new JwtAuthGuard('access_token'))
  @Get()
  findAll(): Promise<Recruit[]> {
    return this.recruitService.findAll();
  }

  // findOne : id를 기준으로 특정 지원자 조회
  @UseGuards(new JwtAuthGuard('access_token'))
  @Get(':applyId')
  findOne(@Param('applyId') id: number): Promise<Recruit> {
    return this.recruitService.findOne(id);
  }

  // update : id를 기준으로 특정 지원자 수정
  @UseGuards(new JwtAuthGuard('access_token'))
  @Patch(':applyId')
  update(@Param('applyId') id: number, @Body() updateDto: ApplyDto): Promise<Recruit> {
    return this.recruitService.update(id, updateDto);
  }


  // remove : id를 기준으로 특정 지원자 삭제
  @UseGuards(new JwtAuthGuard('access_token'))
  @Delete(':applyId')
  remove(@Param('applyId') id: number): Promise<number> {
    return this.recruitService.remove(id);
  }

  // firstPass : id를 기준으로 특정 지원자 1차 합불 처리
  @UseGuards(new JwtAuthGuard('access_token'))
  @Patch('firstPass/:applyId')
  firstPass(@Param('applyId') id: number, @Body('isPass') pass: boolean): Promise<Recruit> {
    return this.recruitService.firstPass(id, pass);
  }

  // secondPass : id를 기준으로 특정 지원자 2차 합불 처리
  @UseGuards(new JwtAuthGuard('access_token'))
  @Patch('secondPass/:applyId')
  secondPass(@Param('applyId') id: number, @Body('isPass') pass: boolean): Promise<Recruit> {
    return this.recruitService.secondPass(id, pass);
  }

}
