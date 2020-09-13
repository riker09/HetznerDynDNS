import { Controller, Get, Query } from '@nestjs/common';
import { AppService } from './app.service';
import { RecordService } from './record.service';
import { IRecord } from './irecord.interface';
import { HomeService } from './home.service';
import { FritzBoxDnyDnsQueryParams } from './fritz-box-dyndns-query-params';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly homeService: HomeService,
    private readonly recordService: RecordService
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get(`/records`)
  getRecords() {
    return this.recordService.GetAllRecords();
  }

  @Get('/update')
  updateHomeZone(@Query() query: FritzBoxDnyDnsQueryParams) {
    return this.homeService.UpdateHomeZone(query);
  }
}
