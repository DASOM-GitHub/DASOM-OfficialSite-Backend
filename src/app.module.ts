import { Module } from '@nestjs/common';
import { RecruitModule } from './recruit/recruit.module';
import { MongooseModule } from "@nestjs/mongoose";
import { FormModule } from './form/form.module';
import { ServiceSettingsModule } from './service-settings/service-settings.module';
import { ConfigModule, ConfigService } from "@nestjs/config";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: [
        process.env.NODE_ENV === 'prod' ?
          'env/.env.prod' : 'env/.env.dev',
      ],
    }),
    MongooseModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('DB_URI'),
      }),
    }),
    RecruitModule,
    FormModule,
    ServiceSettingsModule,
  ],
})
export class AppModule {}
