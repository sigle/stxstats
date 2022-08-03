import { HttpModule } from '@nestjs/axios';
import { CacheModule, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { validate } from './env.validation';
import { StatsModule } from './stats/stats.module';
import { TasksService } from './tasks.service';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, validate, cache: true }),
    CacheModule.register({ isGlobal: true, ttl: 10, max: 3000 }),
    ScheduleModule.forRoot(),
    StatsModule,
    HttpModule,
  ],
  controllers: [AppController],
  providers: [AppService, TasksService],
})
export class AppModule {}
