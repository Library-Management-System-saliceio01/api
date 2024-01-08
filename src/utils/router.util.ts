import { ILambdaEvent } from "@/interface/lambda-event.interface";
import { IRouteGateway } from "@/interface/route-gateway.interface";

function isUUIDOrString(value: string): boolean {
    const uuidPattern = /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/;

    if (uuidPattern.test(value)) {
        return true;
    }

    return false;
}

function getValueAfterBaseRoute(path: string, baseRoute: string) {
    const regex = new RegExp(`${baseRoute}/(.*)`);
    const match = regex.exec(path);

    return match && match[1] ? match[1] : null;
}

function extractUUIDFromPath(path: string) {
    const regex = /\/(\w{8}-\w{4}-\w{4}-\w{4}-\w{12})/;
    const match = regex.exec(path);

    return match && match[1] ? match[1] : null;
}

function findHandler<T>(configuration: IRouteGateway<T>[], event: ILambdaEvent<T>): IRouteGateway<T> {
    const selectedHandler = configuration.find((result: IRouteGateway<T>) => {
        return (((result.path === event.path) && !result.hasParameters) || (isUUIDOrString(getValueAfterBaseRoute(event.path, result.path)) && result.hasParameters)) && (result.method === event.httpMethod)
    })

    return selectedHandler
}

export { isUUIDOrString, getValueAfterBaseRoute, findHandler, extractUUIDFromPath }