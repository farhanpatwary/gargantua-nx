import { forwardRef, Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { UsersModule } from '../users/users.module';
import { AuthService } from './auth.service';
import { LocalStrategy } from './local.strategy';
import { AuthController } from './auth.controller';

@Module({
  providers: [AuthService, LocalStrategy],
  exports: [AuthService],
  imports: [PassportModule, forwardRef(() => UsersModule)],
  controllers: [AuthController],
})
export class AuthModule {}
