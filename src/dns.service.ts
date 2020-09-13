import { Injectable, HttpService } from '@nestjs/common';
import { IRecordDto, IRecord } from './irecord.interface';
import { Observable } from 'rxjs';
import { AxiosResponse } from 'axios';
import { HetznerResponsePaginated } from './i-hetzner-response-paginated';
import { ConfigService } from '@nestjs/config';
import { HETZNER_DNS_API_BASEURL_ENV_NAME, HETZNER_DNS_API_TOKEN_ENV_NAME } from './constants';

@Injectable()
export class DnsService {
  private baseurl: string;
  private token: string;

  constructor(
    private httpService: HttpService,
    private configService: ConfigService
  ) {
    this.baseurl = this.configService.get(HETZNER_DNS_API_BASEURL_ENV_NAME, 'https://dns.hetzner.com/api/v1/');
    this.token = this.configService.get(HETZNER_DNS_API_TOKEN_ENV_NAME);

    if (!this.baseurl) {
      throw new Error('Missing value for baseurl.');
    }
    if (!this.token) {
      throw new Error('Missing value for token.');
    }
  }

  public GetRecords(path: string): Observable<AxiosResponse<HetznerResponsePaginated<IRecord>>> {
    const url = `${this.baseurl}${path.replace(/^\//, '')}`;
    return this.httpService.get(url, {
      headers: {
        'Auth-API-Token': this.token,
      },
    });
  }

  public UpdateRecord(path: string, record: IRecordDto): Observable<AxiosResponse<IRecord>> {
    const url = `${this.baseurl}${path.replace(/^\//, '')}`;
    return this.httpService.put(url, record, {
      headers: {
        'Auth-API-Token': this.token,
      },
    });
  }
}
