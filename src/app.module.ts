import { Module } from '@nestjs/common';
import { AppController, my } from './app.controller';
import { AppService } from './app.service';
import { GoogledrivecasaModule } from './mongoose.module';
import { AUTH_SCHEMA, AuthEntity, AuthMongoRepository, BlogService } from './blog.service';
import { SpreadsheetormModule } from './spreadsheetorm/spreadsheetorm.module';
import { AuthModule } from './auth/auth.module';

export const  IAUTH_REPOSITORY = 'IAuthRepository'

@Module({
  imports: [
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService, {provide:IAUTH_REPOSITORY,useClass:AuthMongoRepository}]
})
export class AppModule {}
