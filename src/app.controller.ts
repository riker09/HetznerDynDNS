import { Controller, Get, Query } from '@nestjs/common';
import { AppService } from './app.service';
import { RecordService } from './record.service';
import { HomeService } from './home.service';
import { FritzBoxDyndnsQueryParams } from './interfaces';

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
  updateHomeZone(@Query() query: FritzBoxDyndnsQueryParams) {
    return this.homeService.UpdateHomeZone(query);
  }
}
