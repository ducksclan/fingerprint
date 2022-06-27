import { describe, it } from 'mocha';
import { should } from 'chai';
import IpInfo from './ip.info';

const LOOPBACK_IPV4 = '127.0.0.1';
const LOOPBACK_IPV6 = '::1';
const IPV4 = '89.40.206.236';
const EMBEDDED_IPV4 = '::ffff:89.40.206.236';
const IPV6 = '2001:ac8:31:241::5';

describe('IpInfo', () => {
    describe('#getBy()', () => {
        it('should return undefined when passed parameter is localhost with ipv4', () => {
            let result = IpInfo.getBy(LOOPBACK_IPV4);
            should().equal(result, undefined);
        });

        it('should return undefined when passed parameter is localhost with ipv6', () => {
            let result = IpInfo.getBy(LOOPBACK_IPV6);
            should().equal(result, undefined);
        });

        it('should return undefined when passed parameter is undefined', () => {
            // @ts-ignore

            let result = IpInfo.getBy(undefined);
            should().equal(result, undefined);
        });

        it('should return undefined when passed parameter is 1', () => {
            let result = IpInfo.getBy(1);
            should().equal(result, undefined);
        });

        it('should return IpInfo instance when passed parameter is valid ipv4', () => {
            let result = IpInfo.getBy(IPV4);
            should().equal(result instanceof IpInfo, true);
        });

        it('should return IpInfo instance when passed parameter is valid embedded ipv4', () => {
            let result = IpInfo.getBy(EMBEDDED_IPV4);
            should().equal(result instanceof IpInfo, true);
        });

        it('should return IpInfo instance when passed parameter is valid ipv6', () => {
            let result = IpInfo.getBy(IPV6);
            should().equal(result instanceof IpInfo, true);
        });
    });

    describe('#parse()', () => {
        it('shold return undefined when ip property of passed parameter is undefined', () => {
            // @ts-ignore

            let result = IpInfo.parse({});
            should().equal(result, undefined);
        });

        it('shold return undefined when passed parameter is undefined', () => {
            // @ts-ignore

            let result = IpInfo.parse();
            should().equal(result, undefined);
        });
    });

    describe('#toString()', () => {
        const ipInfo = IpInfo.getBy(IPV6);

        if (ipInfo === undefined) {
            throw new Error('ipInfo is undefined');
        }

        it('should return string', () => {
            let result = ipInfo.toString();
            should().equal(typeof result, 'string');
        });
    });
});
