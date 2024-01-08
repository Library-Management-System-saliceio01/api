import { Book, User } from "@/entities";
import { IFormatResponse, ILambdaEvent } from "@/interface";
import { BookService, UserBorrowBookService } from "@/services";
import { formatJSONResponse } from "@/utils";

const request = async (event: ILambdaEvent<User>): Promise<IFormatResponse> => {
    const { id } = event.pathParameters

    let book: Book = null

    try {
        book = await BookService.getBook(id)
    } catch (error) {
        return formatJSONResponse({
            error: error.message
        }, 500)
    }

    if (!book) {
        return formatJSONResponse({
            error: 'Book not found'
        }, 404)
    }

    if (!book.isBorrowed) {
        return formatJSONResponse({
            error: 'Book is not borrowed'
        }, 400)
    }

    try {
        await UserBorrowBookService.returnBook(book)

        return formatJSONResponse({
            message: 'Book returned successfully'
        })
    } catch (error) {
        return formatJSONResponse({
            error: error.message
        }, 500)
    }
}

export const returnBookHandler = request