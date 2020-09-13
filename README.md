# Hetzner DynDNS

*tl;dr* Update a DNS record via the Hetzner DNS API.

## Requirements

* Hetzner DNS Console
* API Token
* A/AAAA record

If you don't have one, go and create a Hetzner account at https://accounts.hetzner.com/. You'll need to move your DNS zone file to Hetzner for obvious reasons. Generate an API token to access the [DNS API](https://dns.hetzner.com/settings/api-token).

## Intentional use case

Like DnyDns, but without the middleman.

## Environment Variables

| Name | Default value |
| ---- | ------------- |
| HETZNER_DNS_API_BASEURL | `https://dns.hetzner.com/api/v1/` |
| HETZNER_DNS_API_TOKEN | |
| HOMEZONE_SUBDOMAIN_NAME | `home` |


## TODO

* Create new A/AAAA record when not found
* Support multiple records (home, dyn, ...)
* Logging, Reporting
* Build image with GitHub Actions

## Usage

```bash
curl 'http://localhost:3000/update?domain=your-domain.tld&ipv4=1.2.3.4&ipv6=fe80::1234'
```

> *Please note:* Values for `domain` and `ipv6` are optional.

### Set up AVM Fritzbox

You can provide your own DynDNS update URL in your AVM Fritzbox settings. See https://service.avm.de/help/de/FRITZ-Box-Fon-WLAN-7490/016/hilfe_dyndns for further instructions.

```
http://192.168.178.XXX:3000/update?domain=<domain>&ipv4=<ipaddr>&ipv6=ipaddr6
```

There are more parameters that are supported by the Fritzbox, but are currently not supported by this tool.