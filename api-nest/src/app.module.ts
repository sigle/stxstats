import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { validate } from './env.validation';
import { StatsModule } from './stats/stats.module';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true, validate }), StatsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
