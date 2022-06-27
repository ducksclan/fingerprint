import { Request } from 'express';
import geoip from 'geoip-lite';

interface IIpInfo {
    ip: string;
    country: string;
    region: string;
    city: string;
}

export default class IpInfo implements IIpInfo {
    ip: string;
    country: string;
    region: string;
    city: string;

    constructor(info: IIpInfo) {
        this.ip = info.ip;
        this.country = info.country;
        this.region = info.region;
        this.city = info.city;
    }

    static parse(request: Request): IpInfo | undefined {
        return this.getBy(request?.ip);
    }

    static getBy(ip: string): IpInfo | undefined;
    static getBy(ip: number): IpInfo | undefined;
    static getBy(ip: string | number): IpInfo | undefined {
        let geoinfo = geoip.lookup(ip);

        if (geoinfo === null) return undefined;

        return new IpInfo({
            ip: typeof ip === 'number' ? ip.toString() : ip,
            country: geoinfo.country,
            region: geoinfo.region,
            city: geoinfo.city,
        });
    }

    toString(): string;
    toString(separator: string): string;
    toString(separator: string = ', '): string {
        return [this.country, this.region, this.city]
            .filter(v => v)
            .join(separator);
    }
}
