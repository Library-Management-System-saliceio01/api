import * as jwt from "jsonwebtoken";

import { IJwtPayload } from "@/interface";
import jwtConfig from "@/config/api-config";

export class JwtService {
    private userData: IJwtPayload

    constructor(
        userData?: IJwtPayload,
    ) {
        this.userData = userData
    }

    generateToken(): string {
        return jwt.sign(this.userData, jwtConfig.jwtPassword);
    }

    static getTokenData(token: string): IJwtPayload {
        return jwt.verify(token, jwtConfig.jwtPassword) as IJwtPayload
    }
}