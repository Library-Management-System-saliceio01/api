import { IFormatResponse } from "./format-response.interface";
import { ILambdaEvent } from "./lambda-event.interface";

export interface IRouteGateway<T> {
    path: string
    method: string
    hasParameters: boolean
    roles?: string[]
    func: (event: ILambdaEvent<T>) => Promise<IFormatResponse>
}