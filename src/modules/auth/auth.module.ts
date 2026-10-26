import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './infrastructure/http/auth.controller';

@Module({
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
