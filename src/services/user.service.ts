import { User } from "@/entities";
import { userRepository } from "@/utils";

export class UserService {
    static userRepository = userRepository

    static async createUser(user: User): Promise<User> {
        return await this.userRepository.save(user)
    }

    static async getUser(userId: string): Promise<User> {
        return await this.userRepository.findOneOrFail({
            where: {
                id: userId
            }
        })
    }
}