import { BadRequestException, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

import { TokenService } from '@/modules/token/token.service';
import { CreateUserDTO } from '@/modules/users/dto/index';
import { UsersService } from '@/modules/users/users.service';

import { AppError } from '@/common/constants/errors';

import { LoginUserDTO } from './dto/index';
import { AuthUserResponse } from './response';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly tokenService: TokenService,
  ) {}

  async registerUsers(dto: CreateUserDTO): Promise<CreateUserDTO> {
    const existUser = await this.userService.findUserByEmail(dto.email);
    if (existUser) throw new BadRequestException(AppError.USER_EXIST);

    return this.userService.createUser(dto);
  }

  async loginUser(dto: LoginUserDTO): Promise<AuthUserResponse> {
    const existUser = await this.userService.findUserByEmail(dto.email);
    if (!existUser) throw new BadRequestException(AppError.USER_NOT_EXIST);

    const userData = {
      name: existUser.firstName,
      email: existUser.email,
    };

    const validatePassword = await bcrypt.compare(
      dto.password,
      existUser.password,
    );
    if (!validatePassword) throw new BadRequestException(AppError.WRONG_DATA);

    const token = await this.tokenService.generateJwtToken(userData);
    const user = await this.userService.publicUser(dto.email);

    return { ...user, token };
  }
}
