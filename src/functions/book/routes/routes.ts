import { User } from "@/entities";
import { EHttpMethod, UserRoles } from "@/enum";
import { IRouteGateway } from "@/interface";
import { createBookHandler, deleteBookHandler, getBookHandler, getBooksPaginatedHandler, updateBookHandler } from "../handlers";
import { searchBooksHandler } from "../handlers/search-books.handler";

const baseRoute = "/book";

export const bookRoutes: IRouteGateway<User>[] = [
    {
        path: `${baseRoute}`,
        method: EHttpMethod.POST,
        hasParameters: false,
        roles: [UserRoles.librarian],
        func: createBookHandler,
    },
    {
        path: `${baseRoute}`,
        method: EHttpMethod.GET,
        hasParameters: true,
        func: getBookHandler
    },
    {
        path: `${baseRoute}`,
        method: EHttpMethod.GET,
        hasParameters: false,
        func: getBooksPaginatedHandler
    },
    {
        path: `${baseRoute}/search`,
        method: EHttpMethod.GET,
        hasParameters: false,
        func: searchBooksHandler,
    },
    {
        path: `${baseRoute}`,
        method: EHttpMethod.PUT,
        hasParameters: true,
        roles: [UserRoles.librarian],
        func: updateBookHandler,
    },
    {
        path: `${baseRoute}`,
        method: EHttpMethod.DELETE,
        hasParameters: true,
        roles: [UserRoles.librarian],
        func: deleteBookHandler,
    }
];