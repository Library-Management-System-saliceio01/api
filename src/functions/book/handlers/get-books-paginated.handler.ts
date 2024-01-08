import { User } from "@/entities";
import { IFormatResponse, ILambdaEvent } from "@/interface";
import { BookService } from "@/services";
import { formatJSONResponse } from "@/utils";

const request = async (event: ILambdaEvent<User>): Promise<IFormatResponse> => {
    const { page, pageSize } = event.queryStringParameters

    if (!page || !pageSize) {
        return formatJSONResponse({
            body: JSON.stringify({
                error: 'Missing page or pageSize'
            })
        }, 400)
    }

    try {
        const books = await BookService.getBooksPaginated(+page, +pageSize)

        return formatJSONResponse({
            data: books.data,
            totalCount: books.totalCount
        })
    } catch (error) {
        return formatJSONResponse({
            error: error.message
        }, 500)
    }
}

export const getBooksPaginatedHandler = request