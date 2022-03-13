import { forwardRef, Module } from '@nestjs/common';
import { AuthModule } from '../auth/auth.module';
import { UsersModule } from '../users/users.module';

import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [UsersModule, forwardRef(() => AuthModule)],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
