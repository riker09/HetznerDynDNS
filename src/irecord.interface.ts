import { RecordType } from './record-type';

export interface IRecordDto {
  name: string;
  ttl: number;
  type: RecordType;
  value: string;
  zone_id: string;
}

export interface IRecord extends IRecordDto {
  id: string;
  created: string;
  modified: string;
}