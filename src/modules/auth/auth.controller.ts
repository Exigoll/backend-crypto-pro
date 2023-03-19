import { Body, Controller, Post } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

import { CreateUserDTO } from '@/modules/users/dto/index';

import { JwtAuthGuard } from '@/guards/jwt-guard';

import { AuthService } from './auth.service';
import { LoginUserDTO } from './dto';
import { AuthUserResponse } from './response';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiTags('API')
  @ApiResponse({ status: 201, type: AuthUserResponse })
  @Post('register')
  register(@Body() dto: CreateUserDTO): Promise<AuthUserResponse> {
    return this.authService.registerUsers(dto);
  }

  @ApiTags('API')
  @ApiResponse({ status: 200, type: AuthUserResponse })
  @Post('login')
  login(@Body() dto: LoginUserDTO): Promise<AuthUserResponse> {
    return this.authService.loginUser(dto);
  }
}
