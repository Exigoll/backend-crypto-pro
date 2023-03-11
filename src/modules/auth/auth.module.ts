import { Module } from '@nestjs/common';

import { TokenModule } from '@/modules/token/token.module';
import { UsersModule } from '@/modules/users/users.module';

import { JwtStrategy } from '@/strategy/index';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  imports: [UsersModule, TokenModule],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
})
export class AuthModule {}
