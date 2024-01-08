import { Book, User } from "@/entities";
import { IFormatResponse, ILambdaEvent } from "@/interface";
import { BookService } from "@/services";
import { formatJSONResponse } from "@/utils";

const request = async (event: ILambdaEvent<User>): Promise<IFormatResponse> => {
    const { id } = event.pathParameters

    let book: Book = null

    if (!id) {
        return formatJSONResponse({
            body: JSON.stringify({
                error: 'Missing book id'
            })
        }, 400)
    }

    try {
        book = await BookService.getBook(id)

        if (!book) {
            return formatJSONResponse({
                error: 'Book not found'
            }, 404)
        }

        return formatJSONResponse({
            data: book
        })
    } catch (error) {
        return formatJSONResponse({
            error: error.message
        }, 500)
    }
}

export const getBookHandler = request