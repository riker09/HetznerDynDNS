import { Injectable } from "@nestjs/common";

export interface FritzBoxDyndnsQueryParams
{
  ipv4: string;
  ipv6: string;
  domain: string;
}