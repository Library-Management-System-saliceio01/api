import { User } from "@/entities";
import { EHttpMethod, UserRoles } from "@/enum";
import { IRouteGateway } from "@/interface";
import { returnBookHandler, takeBookHandler } from "../handlers";

const baseRoute = '/user-borrow-book'

export const userBorrowBookRoutes: IRouteGateway<User>[] = [
    {
        path: `${baseRoute}/take-book`,
        method: EHttpMethod.GET,
        hasParameters: true,
        roles: [UserRoles.member],
        func: takeBookHandler,
    },
    {
        path: `${baseRoute}/return-book`,
        method: EHttpMethod.GET,
        hasParameters: true,
        roles: [UserRoles.librarian],
        func: returnBookHandler,
    }
]