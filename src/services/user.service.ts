import { User } from "@/entities";
import { userRepository } from "@/utils";
import * as bcrypt from "bcryptjs";

export class UserService {
    private password = ''

    constructor(
        password: string
    ) {
        this.password = password
    }

    async createUser(user: User): Promise<User> {
        return await userRepository.save({ ...user, password: this.password })
    }

    static async getUser(userId: string): Promise<User> {
        return await userRepository.findOneOrFail({
            where: {
                id: userId
            }
        })
    }

    hashPassword() {
        const salt = bcrypt.genSaltSync(10);
        this.password = bcrypt.hashSync(this.password, salt);
    }
}