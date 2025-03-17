import {
    Body,
    Controller,
    Post,
  } from '@nestjs/common';
  import { AuthService } from './auth.services';
  import {
    LoginDto,
    SignupDto,
  } from './auth_dtos';

  
  @Controller('jewelneck/auth')
  export class AuthController {
    constructor(private authService: AuthService) {}
  
    @Post('signup')
    signup(@Body() dto: SignupDto) {
      return this.authService.signup(dto);
    }
  
    @Post('signin')
    signin(@Body() dto: LoginDto) {
      console.log('SIGNIN', dto);
      return this.authService.signin(dto);
    }
  
    
  }