import { IFormatResponse } from "@/interface/format-response.interface";
import { ILambdaEvent } from "@/interface/lambda-event.interface";
import { IRouteGateway } from "@/interface/route-gateway.interface";
import { formatJSONResponse } from "@/utils/api-gateway";
import { findHandler } from "@/utils/router.util";
import validateRolesMiddleware from "./validateRoles";

async function withMiddleware<T>(configuration: IRouteGateway<T>[], event: ILambdaEvent<T>): Promise<IFormatResponse> {
    const selectedHandler = findHandler(configuration, event)

    if (!selectedHandler) {
        return formatJSONResponse({
            message: 'Route not found'
        }, 400)
    }

    if (selectedHandler.roles) {
        if (!validateRolesMiddleware(event, selectedHandler.roles)) return formatJSONResponse({
            message: 'User is not authorized'
        }, 401)
    }

    if (selectedHandler) {
        return await selectedHandler.func(event)
    }

    return formatJSONResponse({
        message: 'Router error'
    }, 400)
}

export default withMiddleware