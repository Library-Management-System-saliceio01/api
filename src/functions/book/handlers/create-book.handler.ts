import { Book, User } from "@/entities";
import { IFormatResponse, ILambdaEvent } from "@/interface";
import { BookService } from "@/services";
import { formatJSONResponse } from "@/utils";

const request = async (event: ILambdaEvent<User>): Promise<IFormatResponse> => {
    const { title, author, genre, isbn, totalCopies } = event.body

    const bookEntity = new Book(title, author, genre, isbn, totalCopies)

    try {
        const newBook = await BookService.createBook(bookEntity)

        return formatJSONResponse({
            data: newBook
        }, 201)
    } catch (error) {
        return formatJSONResponse({
            error: error.message
        }, 500)
    }
}

export const createBookHandler = request