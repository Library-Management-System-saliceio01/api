import { ILambdaEvent } from "@/interface/lambda-event.interface"
import { IRouteGateway } from "@/interface/route-gateway.interface"
import { dbMiddleware } from "@/middlewares/db"
import { pathParameters } from "@/middlewares/path-parameters"
import withMiddleware from "@/middlewares/withMiddeware"
import middy from "@middy/core"
import middyJsonBodyParser from "@middy/http-json-body-parser"

export const middyfy = <T>(routes: IRouteGateway<T>[], extraMiddleware?: Array<() => middy.MiddlewareObj>) => {
  const middyFunc = middy((event: ILambdaEvent<T>) => {
    return withMiddleware(routes, event)
  })
    .use(middyJsonBodyParser())
    .use(dbMiddleware())
    .use(pathParameters())

  if (extraMiddleware?.length) {
    for (const middleware of extraMiddleware) {
      middyFunc.use(middleware())
    }
  }

  return middyFunc
}