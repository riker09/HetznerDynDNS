import { RecordType } from './record-type';

export interface RecordDto {
  name: string;
  ttl: number;
  type: RecordType;
  value: string;
  zone_id: string;
}

export interface Record extends RecordDto {
  id: string;
  created: string;
  modified: string;
}