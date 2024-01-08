import { ILambdaEvent } from "@/interface/lambda-event.interface";
import middy from "@middy/core";
import { APIGatewayProxyResult } from "aws-lambda";
import { formatJSONResponse } from "@/utils/api-gateway";
import { JwtService, UserService } from "@/services";

export function populateUserMiddleware<T>(): middy.MiddlewareObj<ILambdaEvent<T>, APIGatewayProxyResult> {
    return {
        before: async ({ event }) => {
            const tokenData = JwtService.getTokenData(event.headers.Authorization)

            const user = await UserService.getUser(tokenData.id)

            if (!user) {
                return formatJSONResponse({
                    message: 'Cannot found an user with your security key'
                }, 401)
            }

            event.userMetadata = user as T
        }
    }
}