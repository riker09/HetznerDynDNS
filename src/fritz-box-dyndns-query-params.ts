import { Injectable } from "@nestjs/common";

@Injectable()
export class FritzBoxDnyDnsQueryParams
{
  ipv4: string;
  ipv6: string;
  domain: string;
}