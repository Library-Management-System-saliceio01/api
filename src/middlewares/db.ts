import { ILambdaEvent } from "@/interface/lambda-event.interface";
import middy from "@middy/core";
import { APIGatewayProxyResult } from "aws-lambda";
import { db } from "@/db/init";

export function dbMiddleware<T>(): middy.MiddlewareObj<ILambdaEvent<T>, APIGatewayProxyResult> {
    return {
        before: async () => {
            await db().then()
        }
    }
}