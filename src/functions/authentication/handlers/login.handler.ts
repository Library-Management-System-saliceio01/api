import { User } from "@/entities";
import { IFormatResponse, ILambdaEvent } from "@/interface";
import { JwtService, PasswordService } from "@/services";
import { formatJSONResponse } from "@/utils/api-gateway";

const request = async (event: ILambdaEvent<User>): Promise<IFormatResponse> => {
    const { username, password } = event.body

    if (!(username && password) || (!username || !password)) {
        return formatJSONResponse({
            message: 'Username & Password are required'
        }, 400)
    }

    const pwdService = new PasswordService(username, password)

    const user = await pwdService.getUser()

    if (!user) {
        return formatJSONResponse({
            error: 'User not found'
        }, 404)
    }

    const isPasswordValid = await pwdService.checkPassword()

    if (!(isPasswordValid)) {
        return formatJSONResponse({
            error: 'Invalid credentials'
        }, 401)
    }

    const jwtService = new JwtService({
        id: user.id,
        username: user.username,
        role: user.role,
    })

    try {
        const token = jwtService.generateToken()

        return formatJSONResponse({
            data: {
                token: token,
            }
        })

    } catch (error) {
        return formatJSONResponse({
            error: error.message
        }, 500)
    }
}

export const loginHandler = request