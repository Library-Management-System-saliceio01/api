import { User } from "@/entities";
import { IFormatResponse, ILambdaEvent } from "@/interface";
import { formatJSONResponse } from "@/utils";

const request = async (event: ILambdaEvent<User>): Promise<IFormatResponse> => {
    return formatJSONResponse({
        data: 'Hello World'
    })   
}

export const dashboardDataHandler = request