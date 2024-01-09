import { User } from "@/entities";
import { UserRoles } from "@/enum";
import { IFormatResponse, ILambdaEvent } from "@/interface";
import { UserService } from "@/services";
import { formatJSONResponse } from "@/utils";

const request = async (event: ILambdaEvent<User>): Promise<IFormatResponse> => {
    let { name, username, password, role } = event.body

    if (!username || !password || !role) {
        return formatJSONResponse({
            error: 'Missing username, password or role'
        }, 400)
    }

    if (!name) {
        name = null
    }

    if (role != UserRoles.member && role != UserRoles.librarian) {
        return formatJSONResponse({
            error: 'The role must be member or librarian'
        })
    }

    const userEntity = new User(username, password, role, name)

    try {
        const userService = new UserService(password)

        userService.hashPassword()

        const newUser = await userService.createUser(userEntity)

        return formatJSONResponse({
            data: newUser,
            message: 'Successfull created'
        }, 201)
    } catch (error) {
        return formatJSONResponse({
            error: error.message
        }, 500)
    }
}

export const registerHandler = request