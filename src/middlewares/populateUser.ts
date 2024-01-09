import { ILambdaEvent } from "@/interface/lambda-event.interface";
import middy from "@middy/core";
import { APIGatewayProxyResult } from "aws-lambda";
import { formatJSONResponse } from "@/utils/api-gateway";
import { JwtService, UserService } from "@/services";
import { User } from "@/entities";

export function populateUserMiddleware<T>(): middy.MiddlewareObj<ILambdaEvent<T>, APIGatewayProxyResult> {
    return {
        before: async ({ event }) => {
            let user: User = null

            const tokenData = JwtService.getTokenData(event.headers.Authorization)

            try {
                user = await UserService.getUser(tokenData.id)
            } catch (error) {
                return formatJSONResponse({
                    message: 'Cannot found an user with your security key'
                }, 404)
            }

            event.userMetadata = user as T
        }
    }
}