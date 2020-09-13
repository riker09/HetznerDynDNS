import { Injectable } from '@nestjs/common';
import { Record } from './interfaces';
import { DnsService } from './dns.service';

@Injectable()
export class RecordService {
  private records: Record[] = [];

  constructor(private dnsService: DnsService) { }

  public async GetAllRecords(): Promise<Record[]> {
    if (this.records.length < 1) {
      const result = await this
        .dnsService
        .GetRecords('records')
        .toPromise();

      this.records = result.data.records;
    }
    return this.records;
  }

  public UpdateRecord(record: Record): Record {
    var result: Record = null;

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
