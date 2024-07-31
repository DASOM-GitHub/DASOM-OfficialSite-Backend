import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { RecruitController } from './recruit.controller';
import { RecruitService } from './recruit.service';
import { Recruit, RecruitSchema } from './recruit.schema';
import { getConnectionToken } from '@nestjs/mongoose';
import * as AutoIncrementFactory from 'mongoose-sequence';

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: Recruit.name,
        useFactory: async (connection) => {
          const schema = RecruitSchema;
          const AutoIncrement = AutoIncrementFactory(connection);
          schema.plugin(AutoIncrement, { inc_field: 'applyId' });
          return schema;
        },
        inject: [getConnectionToken()],
      },
    ]),
  ],
  controllers: [RecruitController],
  providers: [RecruitService],
  exports: [RecruitService],
})
export class RecruitModule {}
