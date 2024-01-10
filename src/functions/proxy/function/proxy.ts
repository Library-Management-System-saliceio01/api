import { middyfy } from "@/libs/lambda";
import { authenticationMiddleware } from "@/middlewares/authentication";
import { populateUserMiddleware } from "@/middlewares/populateUser";
import { authenticationRoutes, authenticationRoutesWithoutAuth } from '@/functions/authentication/routes/routes';
import { bookRoutes } from "@/functions/book";
import { userBorrowBookRoutes } from "@/functions/user-borrow-book";
import { analyticsRoutes } from "@/functions/analytics";

export const proxyHandler = middyfy([
    ...authenticationRoutes,
    ...bookRoutes,
    ...userBorrowBookRoutes,
    ...analyticsRoutes,
], [authenticationMiddleware, populateUserMiddleware])

export const proxyHandlerWithoutAuthentication = middyfy([
    ...authenticationRoutesWithoutAuth,
], [])