export interface ILambdaEvent<T> {
    body: any;
    headers: {
        [key: string]: string;
    };
    httpMethod: string;
    isBase64Encoded: boolean;
    multiValueHeaders: {
        [key: string]: string[];
    } | null;
    multiValueQueryStringParameters: {
        [key: string]: string[];
    } | null;
    path: string;
    pathParameters: {
        [key: string]: string;
    } | null;
    queryStringParameters: {
        [key: string]: string;
    } | null;
    requestContext: {
        accountId: string;
        apiId: string;
        authorizer: {
            claims: {
                [key: string]: any;
            };
            principalId: string;
            scopes: string[] | undefined;
        };
        domainName: string;
        domainPrefix: string;
        extendedRequestId: string;
        httpMethod: string;
        identity: {
            accessKey: string | null;
            accountId: string;
            apiKey: string;
            apiKeyId: string;
            caller: string;
            cognitoAuthenticationProvider: string;
            cognitoAuthenticationType: string;
            cognitoIdentityId: string;
            cognitoIdentityPoolId: string;
            principalOrgId: string | null;
            sourceIp: string;
            user: string;
            userAgent: string;
            userArn: string;
        };
        operationName: string | undefined;
        path: string;
        protocol: string;
        requestId: string;
        requestTime: string;
        requestTimeEpoch: number;
        resourceId: string;
        resourcePath: string;
        stage: string;
    };
    resource: string;
    stageVariables: {
        [key: string]: string;
    } | null;
    rawBody: string;
    userMetadata: T
}