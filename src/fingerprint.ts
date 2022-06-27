import { Request, RequestHandler } from 'express';
import { x64 } from 'murmurhash3js'; 
import IpInfo from './ip.info';

declare global {
    namespace Express {
        interface Request {
            fingerprint?: string;
            ipInfo?: IpInfo;
        }
    }
}

export default function fingerprint(): RequestHandler {
    return (request, response, next) => {
        try {
            request.ipInfo = IpInfo.parse(request);
            request.fingerprint = hashingFingerprint(request);

            next();
        } catch (error) {
            next(error);
        }
    };
}

function hashingFingerprint(request: Request) {
    const components = [
        request.headers['user-agent'],
        request.headers['accept'],
        request.headers['accept-language'],
        request.ipInfo?.toString('~~~'),
    ];

    return x64.hash128(components.filter(value => value).join('~~~'));
}
