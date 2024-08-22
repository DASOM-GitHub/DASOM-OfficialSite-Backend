import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from "@nestjs/common";
import { RecruitService } from "./recruit.service";
import { ApplyDto } from "./dto/apply.dto";
import { Recruit } from "./recruit.schema";
import { JwtAuthGuard } from "../auth/jwt/jwt.guard";

@Controller('recruit')
export class RecruitController {
  constructor(private recruitService: RecruitService) {}

  // apply : 신규 지원자 등록
  @Post()
  apply(@Body() applyDto: ApplyDto): Promise<Recruit> {
    return this.recruitService.apply(applyDto);
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
  @Patch(':id')
  update(@Param('id') id: number, @Body() updateDto: ApplyDto): Promise<Recruit> {
    return this.recruitService.update(id, updateDto);
  }


  // remove : id를 기준으로 특정 지원자 삭제
  @UseGuards(new JwtAuthGuard('access_token'))
  @Delete(':id')
  remove(@Param('id') id: number): Promise<number> {
    return this.recruitService.remove(id);
  }

  // pass : id를 기준으로 특정 지원자 합불 처리
  @UseGuards(new JwtAuthGuard('access_token'))
  @Post('pass/:id')
  pass(@Param('id') id: number, @Param('pass') pass: boolean): Promise<Recruit> {
    return this.recruitService.pass(id, pass);
  }

}
