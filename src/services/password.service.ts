import { User } from "@/entities";
import { userRepository } from "@/utils/db-repositories.util";
import * as bcrypt from "bcryptjs";

export class PasswordService {
    username: string
    password: string

    constructor(
        username: string,
        password: string,
    ) {
        this.username = username
        this.password = password
    }

    private validatePassword = (password: string, userPassword: string) => {
        return bcrypt.compareSync(password, userPassword);
    }

    async checkPassword(): Promise<boolean> {
        const user = await this.getUser()

        if (!this.validatePassword(this.password, user.password)) {
            return false
        }

        return true
    }

    async getUser(): Promise<User> {
        return await userRepository.findOneOrFail({
            where: {
                username: this.username
            }
        })
    }
}