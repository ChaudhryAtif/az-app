import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AppController } from './app/app.controller';
import { CatModule } from './module/cat/cat.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    CatModule
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule { }
