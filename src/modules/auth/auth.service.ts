import { BadRequestException, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

import { CreateUserDTO } from '@/modules/users/dto/index';
import { UsersService } from '@/modules/users/users.service';

import { AppError } from '@/common/constants/errors';

import { LoginUserDTO } from './dto/index';
import { AuthUserResponse } from './response';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UsersService) {}

  async registerUsers(dto: CreateUserDTO): Promise<AuthUserResponse> {
    try {
      const existUser = await this.userService.findUserByEmail(dto.email);
      if (existUser) throw new BadRequestException(AppError.USER_EXIST);

      await this.userService.createUser(dto);

      return this.userService.publicUser(dto.email);
    } catch (e) {
      throw new Error(e);
    }
  }

  async loginUser(
    dto: LoginUserDTO,
  ): Promise<AuthUserResponse | BadRequestException> {
    try {
      const existUser = await this.userService.findUserByEmail(dto.email);
      if (!existUser) return new BadRequestException(AppError.USER_NOT_EXIST);

      const validatePassword = await bcrypt.compare(
        dto.password,
        existUser.password,
      );
      if (!validatePassword)
        return new BadRequestException(AppError.WRONG_DATA);

      return this.userService.publicUser(dto.email);
    } catch (e) {
      throw new Error(e);
    }
  }
}
