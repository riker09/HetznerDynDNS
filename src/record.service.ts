import { Injectable } from '@nestjs/common';
import { IRecordService } from './irecord-service.interface';
import { IRecord } from './irecord.interface';
import { DnsService } from './dns.service';

@Injectable()
export class RecordService implements IRecordService {
  private records: IRecord[] = [];

  constructor(private dnsService: DnsService) { }

  public async GetAllRecords(): Promise<IRecord[]> {
    if (this.records.length < 1) {
      const result = await this
        .dnsService
        .GetRecords('records')
        .toPromise();

      this.records = result.data.records;
    }
    return this.records;
  }

  public UpdateRecord(record: IRecord): IRecord {
    var result: IRecord = null;

    this
      .dnsService
      .UpdateRecord(`records/${record.id}`, record)
      .subscribe(r => {
        result = r.data;
      });

    // Update record in memory cache
    const idx = this.records.findIndex(r => r.id === record.id);
    this.records.splice(idx, 1, record);

    return result;
  }
}
