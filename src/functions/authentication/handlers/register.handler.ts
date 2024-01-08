import { User } from "@/entities";
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

    const userEntity = new User(name, username, password, role)

    try {
        const newUser = await UserService.createUser(userEntity)

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