import { Injectable } from '@nestjs/common';
import { FritzBoxDyndnsQueryParams } from './interfaces';
import { RecordService } from './record.service';
import { RecordType } from './interfaces/record-type';
import { ConfigService } from '@nestjs/config';
import { HOMEZONE_SUBDOMAIN_NAME_ENV_NAME } from './constants';

@Injectable()
export class HomeService {
  private homeZoneName: string;

  public constructor(
    private recordService: RecordService,
    private configService: ConfigService
  ) {
    this.homeZoneName = this.configService.get(HOMEZONE_SUBDOMAIN_NAME_ENV_NAME, 'home');
  }

  public async UpdateHomeZone(params: FritzBoxDyndnsQueryParams) {
    const result = [];

    // 1. Get all records
    const records = await this.recordService.GetAllRecords();

    // 2. Find old record
    const recordA = records.find(r => r.type === RecordType.A && r.name === this.homeZoneName);
    const recordAAAA = records.find(r => r.type as RecordType.AAAA === RecordType.AAAA && r.name === this.homeZoneName);

    if (!recordA && !recordAAAA) {
      throw new Error(`Unable to find any DNS record named ${this.homeZoneName} for update`);
    }

    // 3. Update records with new IP value
    recordA.value = params.ipv4;
    result.push(this.recordService.UpdateRecord(recordA));

    if (recordAAAA) {
      recordAAAA.value = params.ipv6;
      result.push(this.recordService.UpdateRecord(recordAAAA));
    }

    return result;
  }
}
