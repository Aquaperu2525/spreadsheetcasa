import { ConflictException, HttpException, HttpStatus, Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt'
import { AuthDto } from '../dtos/auth.dto';
import { AuthEntity } from '../entity/auth.entity';
import { IAuthRepository, IAUTH_REPOSITORY } from '../patronAdapter/auth.interface.repository';

@Injectable()
export class AuthService {
    constructor(
        @Inject(IAUTH_REPOSITORY) private authRepository:IAuthRepository,
        ){ }
    async create(userObjectCreate: AuthDto) {
      const {password} = userObjectCreate;
      const plainToHash = await bcrypt.hash(password,10);
      userObjectCreate  = {...userObjectCreate, password:plainToHash}
      const usuario = await this.authRepository.register(userObjectCreate)
      return usuario
    }
}

  
