import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

import { CreateUserDTO } from '@/modules/users/dto/index';
import { UsersService } from '@/modules/users/users.service';

import { JwtAuthGuard } from '@/guards/jwt-guard';

import { AuthService } from './auth.service';
import { LoginUserDTO } from './dto';
import { AuthUserResponse } from './response';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UsersService,
  ) {}

  @ApiTags('API')
  @ApiResponse({ status: 201, type: AuthUserResponse })
  @Post('register')
  register(@Body() dto: CreateUserDTO): Promise<AuthUserResponse> {
    return this.authService.registerUsers(dto);
  }

  @ApiTags('API')
  @ApiResponse({ status: 200, type: AuthUserResponse })
  @Post('login')
  login(
    @Body() dto: LoginUserDTO,
  ): Promise<AuthUserResponse | BadRequestException> {
    return this.authService.loginUser(dto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('get-public-user-info')
  getPublicUserInfo(@Req() request) {
    const user = request.user;
    return this.userService.publicUser(user.email);
  }
}
