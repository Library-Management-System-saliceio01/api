import { User } from "@/entities";
import { IFormatResponse, ILambdaEvent } from "@/interface";
import { BookService } from "@/services";
import { formatJSONResponse } from "@/utils";

const request = async (event: ILambdaEvent<User>): Promise<IFormatResponse> => {
    const { title, author, genre, page, size } = event.queryStringParameters

    if (!title && !author && !genre) {
        return formatJSONResponse({
            message: "Please provide at least one search parameter"
        }, 400)
    }

    try {
        const books = await BookService.findBooks({
            title,
            author,
            genre,
            page: page ? parseInt(page) : undefined,
            size: size ? parseInt(size) : undefined
        })

        return formatJSONResponse({
            data: books.data,
            totalCount: books.totalCount,
        })
    } catch (error) {
        return formatJSONResponse({
            message: error.message
        }, 500)
    }
}

export const searchBooksHandler = request