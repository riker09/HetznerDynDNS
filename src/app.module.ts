import { Module, HttpModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RecordService } from './record.service';
import { DnsService } from './dns.service';
import { HomeService } from './home.service';

@Module({
  imports: [HttpModule, ConfigModule.forRoot()],
  controllers: [AppController],
  providers: [AppService, RecordService, DnsService, HomeService],
})
export class AppModule {}
