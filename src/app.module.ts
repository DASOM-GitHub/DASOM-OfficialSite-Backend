import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { RecruitModule } from './recruit/recruit.module';
import { FormModule } from './form/form.module';
import { ServiceSettingsModule } from './service-settings/service-settings.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: [
        process.env.NODE_ENV === 'prod' ? 'env/.env.prod' : 'env/.env.dev',
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
    AuthModule,
    UserModule,
  ],
})
export class AppModule {}
