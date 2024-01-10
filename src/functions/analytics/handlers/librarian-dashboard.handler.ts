import { Book, User } from "@/entities";
import { IFormatResponse } from "@/interface";
import { BookService, UserBorrowBookService } from "@/services";
import { formatJSONResponse } from "@/utils";

const request = async (): Promise<IFormatResponse> => {
    let countBooks: number = 0
    let userBorrowedBooks: number = 0
    let booksBorrowedExpiratedToday: Book[] = []
    let usersWithBooksBorrowedExpirated: User[] = []

    try {
        countBooks = await BookService.countBooks()
    } catch (error) {
        return formatJSONResponse({
            error: error.message
        }, 500)
    }

    try {
        userBorrowedBooks = await UserBorrowBookService.countUserBorrowedBooks()
    } catch (error) {
        return formatJSONResponse({
            error: error.message
        }, 500)
    }

    try {
        booksBorrowedExpiratedToday = await BookService.booksBorrowedExpiratedToday()
    } catch (error) {
        return formatJSONResponse({
            error: error.message
        }, 500)
    }

    try {
        usersWithBooksBorrowedExpirated = await UserBorrowBookService.usersWithBooksBorrowedExpirated()
    } catch (error) {
        return formatJSONResponse({
            error: error.message
        }, 500)
    }

    return formatJSONResponse({
        countBooks,
        userBorrowedBooks,
        booksBorrowedExpiratedToday,
        usersWithBooksBorrowedExpirated,
    })
}

export const dashboardDataHandler = request