import { Module } from '@nestjs/common';
import { AuthService } from './services/auth.service';
import { AuthController } from './controller/auth.controller';
import { AuthEntity } from './entity/auth.entity';
import { AUTH_SCHEMA } from './schema/auth.schema';
import { AuthMongoRepository } from './patronAdapter/auth.mongo.repository';
import { IAUTH_REPOSITORY } from './patronAdapter/auth.interface.repository';
import { SpreadsheetormModule } from 'src/spreadsheetorm/spreadsheetorm.module';

@Module({
  imports:[
    SpreadsheetormModule.forFeature(
      [
          {
              name:AuthEntity.name,schema:AUTH_SCHEMA
          }
      ]),
  ],
  providers: [
      AuthService,  
      {provide:IAUTH_REPOSITORY,useClass:AuthMongoRepository}
    ],
  exports:[
    AuthService,
    {provide:IAUTH_REPOSITORY,useClass:AuthMongoRepository}
  ],
  controllers: [AuthController]
})
export class AuthModule {}
