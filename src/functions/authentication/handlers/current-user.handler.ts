import { User } from "@/entities";
import { IFormatResponse, ILambdaEvent } from "@/interface";
import { formatJSONResponse } from "@/utils/api-gateway";

const request = async (event: ILambdaEvent<User>): Promise<IFormatResponse> => {
    return formatJSONResponse({
        data: event.userMetadata
    })
}

export const currentUserHandler = request