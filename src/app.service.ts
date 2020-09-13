import { Injectable } from '@nestjs/common';
import { RecordService } from './record.service';

@Injectable()
export class AppService {
  public constructor(private recordService: RecordService) { }

  async getHealth(): Promise<string> {
    if ((await this.recordService.GetAllRecords()).length < 1) {
      throw new Error('Unhealthy: Got no records.')
    }
    return 'Healthy';
  }
}
