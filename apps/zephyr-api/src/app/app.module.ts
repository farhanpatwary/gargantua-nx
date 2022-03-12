import { Module } from '@nestjs/common';
import { UsersController } from '../users/users.controller';
import { UsersModule } from '../users/users.module';

import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [UsersModule],
  controllers: [AppController, UsersController],
  providers: [AppService],
})
export class AppModule {}
