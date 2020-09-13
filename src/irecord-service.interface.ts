import { IRecordDto, IRecord } from './irecord.interface';

export interface IRecordService
{
  GetAllRecords(zoneId: string): Promise<IRecord[]>;

  UpdateRecord(record: IRecordDto): IRecord;
}
