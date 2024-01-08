import { Book, User } from "@/entities";
import { IFormatResponse, ILambdaEvent } from "@/interface";
import { BookService } from "@/services";
import { formatJSONResponse } from "@/utils";

const request = async (event: ILambdaEvent<User>): Promise<IFormatResponse> => {
    const { id } = event.pathParameters

    const { title, author, genre, isbn, totalCopies } = event.body

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

    book.title = title
    book.author = author
    book.genre = genre
    book.isbn = isbn
    book.totalCopies = totalCopies

    try {
        const bookUpdated = await BookService.updateBook(book)

        return formatJSONResponse({
            data: bookUpdated
        })
    } catch (error) {
        return formatJSONResponse({
            error: error.message
        }, 500)
    }
}

export const updateBookHandler = request