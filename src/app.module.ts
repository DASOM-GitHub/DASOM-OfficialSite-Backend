import { Module } from '@nestjs/common';
import { RecruitModule } from './recruit/recruit.module';
import { MongooseModule } from "@nestjs/mongoose";
import { ConfigModule, ConfigService } from "@nestjs/config";
import dbConfig from "./db.config";

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [dbConfig],
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('uri'),
        serverSelectionTimeoutMS: 5000,
        socketTimeoutMS: 45000,
      }),
      inject: [ConfigService],
    }),
    RecruitModule,
  ]
})
export class AppModule {}
