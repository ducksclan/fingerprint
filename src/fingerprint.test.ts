import { describe, it } from 'mocha';
import { assert } from 'chai';
import httpMocks from 'node-mocks-http';
import fingerprint from './fingerprint';
import IpInfo from './ip.info';

let request = httpMocks.createRequest({
    method: 'GET',
    headers: {
        accept:
            'text/html,application/xhtml+xml,application/xml;' +
            'q=0.9,image/avif,image/webp,image/apng,*/*;' +
            'q=0.8,application/signed-exchange;v=b3;q=0.9',
        'accept-encoding': 'gzip, deflate, br',
        'accept-language': 'en-US,en;q=0.9,ru-RU;q=0.8,ru;q=0.7',
        'user-agent':
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) ' +
            'AppleWebKit/537.36 (KHTML, like Gecko) Chrome/102.0.0.0 Safari/537.36',
    },
    ip: '89.40.206.236',
});
let response = httpMocks.createResponse();

describe('fingerprint', () => {
    describe('before using', () => {
        it('request.fingerprint should not exist', () => {
            assert(!!request.fingerprint);
        });

        it('request.ipInfo should not exist', () => {
            assert(!!request.ipInfo);
        });
    });

    fingerprint()(request, response, () => {
        describe('after using as a request handler', () => {
            it('request.fingerprint should match by /^\\w{32}$/ pattern', () => {
                const result = !!request.fingerprint?.match(/^\w{32}$/);

                assert(result);
            });

            it('request.ipInfo should be instance of IpInfo', () => {
                assert(request.ipInfo instanceof IpInfo);
            });
        });
    });
});
