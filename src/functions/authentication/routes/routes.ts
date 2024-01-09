import { User } from "@/entities";
import { EHttpMethod } from "@/enum";
import { IRouteGateway } from "@/interface";
import { currentUserHandler, loginHandler, registerHandler } from "../handlers";

const baseRoute = "/authentication";

export const authenticationRoutes: IRouteGateway<User>[] = [
    {
        path: `${baseRoute}/current-user`,
        method: EHttpMethod.GET,
        hasParameters: false,
        func: currentUserHandler,
    },
];

export const authenticationRoutesWithoutAuth: IRouteGateway<User>[] = [
    {
        path: `${baseRoute}/login`,
        method: EHttpMethod.POST,
        hasParameters: false,
        func: loginHandler,
    },
    {
        path: `${baseRoute}/register`,
        method: EHttpMethod.POST,
        hasParameters: false,
        func: registerHandler
    }
];
