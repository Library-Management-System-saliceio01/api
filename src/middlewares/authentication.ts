import * as jwt from "jsonwebtoken";
import jwtConfig from "../config/jwt.config";
import { ILambdaEvent } from "@/interface/lambda-event.interface";
import middy from "@middy/core";
import { APIGatewayProxyResult } from "aws-lambda";
import { formatJSONResponse } from "@/utils/api-gateway";

export function authenticationMiddleware<T>(): middy.MiddlewareObj<ILambdaEvent<T>, APIGatewayProxyResult> {
    return {
        before: async ({ event }) => {
            const token = <string>event.headers["Authorization"];

            if (!token) {
                return false
            }

            try {
                jwt.verify(token, jwtConfig.jwtPassword);
            } catch (err) {
                return formatJSONResponse({
                    message: 'Unauthorized'
                }, 401)
            }
        }
    }
}