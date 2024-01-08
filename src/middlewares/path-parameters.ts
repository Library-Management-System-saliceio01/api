import { ILambdaEvent } from "@/interface/lambda-event.interface";
import { extractUUIDFromPath } from "@/utils/router.util";
import middy from "@middy/core";
import { APIGatewayProxyResult } from "aws-lambda";

export function pathParameters<T>(): middy.MiddlewareObj<ILambdaEvent<T>, APIGatewayProxyResult> {
    return {
        before: async ({ event }) => {
            event.pathParameters = { id: extractUUIDFromPath(event.path) }
        }
    }
}