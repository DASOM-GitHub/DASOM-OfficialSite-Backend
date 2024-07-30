import { Module } from '@nestjs/common';
import { RecruitModule } from './recruit/recruit.module';

@Module({
  imports: [RecruitModule]
})
export class AppModule {}
