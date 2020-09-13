
export interface ZoneDto {
  name: string;
  ttl: number;
}

export interface Zone extends ZoneDto {
  id: string;
  created: string;
  modified: string;
  legacy_dns_host: string;
  legacy_ns: string[];
  ns: string[];
  owner: string;
  paused: boolean;
  permission: string;
  project: string;
  registrar: string;
  status: string;
  verified: string;
  records_count: number;
  is_secondary_dns: boolean;
  txt_verification: {
    name: string;
    token: string;
  }
}
