import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { RecruitController } from './recruit.controller';
import { RecruitService } from './recruit.service';
import { Recruit, RecruitSchema } from './schema/recruit.schema';
import { getConnectionToken } from '@nestjs/mongoose';
import * as AutoIncrementFactory from 'mongoose-sequence';
import { ServiceSettingsModule } from "../service-settings/service-settings.module";

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
    ServiceSettingsModule,
  ],
  controllers: [RecruitController],
  providers: [RecruitService],
  exports: [RecruitService],
})
export class RecruitModule {}
