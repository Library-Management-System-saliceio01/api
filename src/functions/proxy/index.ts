import { IFunctions } from '@/interface';
import { handlerPath } from '../../libs/handler-resolver';

export const proxyHandlers: IFunctions = {
    functions: {
        'proxy-handler': {
            events: [{
                http: {
                    method: 'any',
                    path: '/{proxy+}',
                    cors: true,
                },
            }],
            handler: `${handlerPath(__dirname)}/function/proxy.proxyHandler`
        },
        'proxy-without-auth-handler': {
            events: [{
                http: {
                    method: 'post',
                    path: '/authentication/login',
                    cors: true,
                },
            }],
            handler: `${handlerPath(__dirname)}/function/proxy.proxyHandlerWithoutAuthentication`
        },
    }
}
