import * as jwt from "jsonwebtoken";
import jwtConfig from "../config/api-config";
import { ILambdaEvent } from "@/interface/lambda-event.interface";

function validateRolesMiddleware<T>(event: ILambdaEvent<T>, roles: string[]): boolean {
    const token = <string>event.headers["Authorization"];

    let jwtRole: string

    if (!token) {
        return false
    }

    try {
        jwtRole = jwt.verify(token, jwtConfig.jwtPassword)['role'];
    } catch (err) {
        return false
    }

    if (roles.includes(jwtRole)) {
        return true
    }

    return false
}

export default validateRolesMiddleware