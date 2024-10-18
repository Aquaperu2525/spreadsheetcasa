import { Body, Controller, Get, Param, Post, Req } from '@nestjs/common';
import { Request } from 'express';
import { AuthDto } from '../dtos/auth.dto';
import { AuthService } from '../services/auth.service';
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}
  
    @Post('register')
    registerUser(@Body() createAuthDto: AuthDto)
    {
      
       return this.authService.create(createAuthDto);
    }
}
