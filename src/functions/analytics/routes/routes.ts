import { User } from "@/entities";
import { EHttpMethod, UserRoles } from "@/enum";
import { IRouteGateway } from "@/interface";
import { dashboardDataHandler, memberDashboardHandler } from "../handlers";

const baseRoute = '/analytics'

export const analyticsRoutes: IRouteGateway<User>[] = [
    {
        path: `${baseRoute}/librarian`,
        method: EHttpMethod.GET,
        hasParameters: false,
        roles: [UserRoles.librarian],
        func: dashboardDataHandler,
    },
    {
        path: `${baseRoute}/member`,
        method: EHttpMethod.GET,
        hasParameters: false,
        roles: [UserRoles.member],
        func: memberDashboardHandler,
    }
]